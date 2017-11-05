#pragma strict

function Start(){
	iTween.MoveTo(gameObject,{	"y": transform.position.y + 1.5,
								"x": transform.position.x +1,
								"time":2,
								"transition":"easeOutElastic"});
}