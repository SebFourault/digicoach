import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { trigger,state, style, animate,transition } from '@angular/animations';
import { DataService } from '../../services/data/data.service';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class ChatbotComponent implements OnInit, OnChanges, AfterViewChecked {

  public userInput;
  // public state = "YES_EXPECTED";
  public state = {};
  public chatlog = [];
  public iframeView = 0;
  public iframeUrl;
  public typing = 1;

  @Input() learningPath;
  public _learningPath;
  @Input() tools;
  @Input() linkedContent;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor( private dataService : DataService ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // When values are transmitted, reload the component to make the conversation start
    this._learningPath = this.learningPath;
    if(this._learningPath) {
      console.log(this.tools);
      var welcomeDialog = this.parseBBcode(this._learningPath.fields['Problem']);
      this.postMultipleBotMessages(welcomeDialog);
    }
  }

  ngAfterViewChecked() {        
      this.refreshScrollToBottom();        
  } 


  postMultipleBotMessages(messages) {

    console.log(messages);

    var timer = 1000;
    messageLoop:
    for (var i = 0; i < messages.length; i++) {

      switch (messages[i].type) {
        case "text":
          timer += messages[i].content.text.length*15;
          this.postBotMessage(messages[i], timer, 1);
          break;
        case "img":
          timer += 1000;
          this.postBotMessage(messages[i], timer, 1);
          break;
        case "quickreply":
          timer += 500;
          this.postBotMessage(messages[i], timer, 0);
          this.state['remainingConv'] = messages.slice(i+1, messages.length);
          break messageLoop;
        case "tools":
          timer += 1500;
          this.postBotMessage({emiter: 'bot', type:'tools', content:this.tools }, timer, 1);
          break;
      }
    }
  }

  parseBBcode(messages) {
    var result = [];
    var messageLines = messages.split(">>");
    for (var i = 0; i < messageLines.length; i++) {
      var type = messageLines[i].split(">")[0].toLowerCase();
      var message = {};

      // Text
      message['text'] = messageLines[i].split(">")[1];

      // Images
      if( type == "img" ) { 
        message['img'] = message['text'].split(" = ")[0];
        message['size'] = message['text'].split(" = ")[1];
      }

      // Quick replies
      if(type == "quickreply") {
        var quickReplyArray = message['text'].split(";");
        delete message['text'];
        for (var j = 0; j < quickReplyArray.length; j++) {
          message[j] = {};
          message[j]['text'] =  quickReplyArray[j].split(" = ")[0];
          message[j]['payload'] =  quickReplyArray[j].split(" = ")[1];
        }
        message = Object.keys(message).map(function(key) { return message[key]; }); // To make it iterable, we convert the object to an array
      }

      result.push({emiter:'bot', type:type, content:message})
    }
    return result;
  }

  sendEvent(quickReply) {
    if( !this.dataService.isUrl(quickReply.payload) ) {
      this.hideQuickReplies();
      this.postUserMessage(quickReply.text);
      this.typing = 1;
    }
    console.log("payload : " + quickReply.payload )
    switch (true) {
      // When Payload is a link
      case ( this.dataService.isUrl(quickReply.payload) ) :
        this.dataService.openUrl(quickReply.payload, "Chatbot", "goToWebsite", quickReply.payload);
        break;
      case (quickReply.payload.indexOf('CONTINUE') >= 0) :
        console.log("continue payload");
        this.postMultipleBotMessages( this.state['remainingConv'] );
        break;
      case (quickReply.payload.indexOf('SHOWLEARNINGPATH') >= 0) :
        this.postMultipleBotMessages(this.parseBBcode(">>TEXT> Allez hop, voici les 3 outils dont je te parle :) >>TOOLS> Joseph >>QUICKREPLY> Commencer l'aventure = STARTLESSON"));
        break;
      case (quickReply.payload.indexOf('STARTLESSON') >= 0) :
        var lessonScript = this.createLessonScript();
        this.postMultipleBotMessages(this.parseBBcode(lessonScript));
        break;
    }
  }

  createLessonScript() {
    var pathTools = this._learningPath.fields['Path'].split(" >> ");
    var lesson = "";
    for (var i = 0; i < pathTools.length; i++) {
      var elementType = pathTools[i].split(" > ")[0];
      var elementName = pathTools[i].split(" > ")[1];
      if( elementType == "TOOL" ) {
        var tool = this.tools.filter(x => x.fields['Tool'] == elementName );
        lesson += tool[0].fields['Lesson'];
        if( pathTools[i+1] ) {
          lesson += ">>TEXT> Allez hop, passons au prochain chapitre : " + pathTools[i+1].split(" > ")[1] + ">>QUICKREPLY> I'm ready ! = CONTINUE";
        }
      }
      if( elementType == "CONTENT" ) {
        var content = this.linkedContent.filter(x => x.fields['Content'] == elementName );
        lesson += content[0].fields['Lesson'];
      }
    }
    return lesson;
  }

  hideQuickReplies() {
    for (var i = 0; i < this.chatlog.length; i++) {
      if( this.chatlog[i].type == "quickreply" ) { this.chatlog[i]['hidden'] = true; }
    }
  }

  send(event) {
    if(event.keyCode == 13) {
      this.postUserMessage(this.userInput);
      this.userInput = "";

      // If state, dont send message to API.AI but send an event, store the right value and change next state
      switch(this.state){
        case "YES_EXPECTED" :
          this.openIframe();
        break;
        
        default:
          // Call for API.ai
        break;
      }
    }
  }


openIframe() {
  this.iframeView = 1;
  this.iframeUrl = "https://thenounproject.com/";
  this.chatlog.push({emiter: 'bot', type:'text', content: "Top ! Decouvrons ensemble The Noun Project, un super outil pour faire des présentations plus impactantes"});
  this.chatlog.push({emiter: 'bot', type:'text', content: "1ère étape : recherche un icone qui exprime la rapidité pour toi"});
}


postBotMessage(msg, time, typing){

  window.setTimeout( data => {
    this.chatlog.push(msg);
    this.typing = typing;
    // this.refreshTypingLoader(typing);
  }, time);
}


showQuickReplies(replies, time){

  window.setTimeout( data => {
    this.chatlog.push({emiter: 'bot', type:'quickreplies', content: replies});
    this.refreshTypingLoader(0);
  	this.refreshScrollToBottom();
  }, time);

   /*window.setTimeout( function(){
   
    $('#chatlog').append('<div class="blank-avatar"></div>');
    for (var i = 0; i < replies.length; i++) {
      $('#chatlog').append('<a class="ChatLog__quickReplies" href="' + replies[i] + '">' + prettyQuickReply(replies[i]) + '</a>');

      // Si le bouton est "sendmail", pas mettre de listener ?
      $("a.ChatLog__quickReplies:last").click(function(event){
          event.preventDefault();
          postUserMessage($(this).text());
          sendEvent($(this).attr("href"));
          $(this).remove();
          return false;
      });
    
    }
    refreshTypingLoader(0);
    refreshScrollToBottom();

  }, time);*/
}

postUserMessage(msg){
  this.chatlog.push({emiter: 'user', type:'text', content: msg});
	this.refreshScrollToBottom();
}

/*
function prettyQuickReply(eventName){

  for (var i = 0; i < contentArr.length; i++) {
    if( contentArr[i].fields['Event'] == eventName ) { return contentArr[i].fields['Formulation']; }
  };
  if(eventName == "USEKNOWNMAIL") { return "Utiliser " + getCookie("userEmail"); }
  return eventName;
}
*/

refreshTypingLoader(typing){
  /*
  $('.typing-loader').remove();
  if(typing){
    $('#chatlog').append('<li class="ChatLog__entry typing-loader"><img class="ChatLog__avatar" src="' + avatarUrl + '" /><p class="ChatLog__loader"><img class="chatLog-loader-img" src="images/typing.gif"></p></li>');
  }
  
  this.refreshScrollToBottom(); */
}

refreshScrollToBottom(){
  this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
}

}
