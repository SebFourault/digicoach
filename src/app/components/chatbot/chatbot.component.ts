import { Component, OnInit, Input } from '@angular/core';
import { trigger,state, style, animate,transition } from '@angular/animations';


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
export class ChatbotComponent implements OnInit {

  public userInput;
  public state = "YES_EXPECTED";
  public chatlog = [{emiter: 'bot', type:'text', content: 'Hey salut !'}, {emiter: 'bot', type:'text', content: "Moi c'est Ratus, ton coach pour les prochaines 5mn :)"}, {emiter: 'bot', type:'text', content: "Prêt à faire un exercice rapide ?"}];
  public iframeView = 0;
  public iframeUrl;

  constructor() { }

  ngOnInit() {
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

  window.setTimeout( function(){
    this.chatlog.push({emiter: 'bot', type:'text', content: msg});
    this.refreshTypingLoader(typing);
  	this.refreshScrollToBottom();
  }, time);
}


postBotImage(img, time, typing){
  window.setTimeout( function(){
    this.chatlog.push({emiter: 'bot', type:'img', content: img});

    //$('#chatlog').append('<li class="ChatLog__entry"><img class="ChatLog__avatar" src="' + avatarUrl + '" /><p class="ChatLog__message ChatLog__message__img"><img class="img-msg" src="' + img + '"></p></li>');
    this.refreshTypingLoader(typing);
    this.refreshScrollToBottom();
  }, time);
}

showQuickReplies(replies, time){
  window.setTimeout( function(){
    /*
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
*/
  }, time);
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
  // scrollToAnchor("bottom-anchor");
  document.getElementById("chatlog").scrollIntoView(false);
}

}
