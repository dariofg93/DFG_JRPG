#pragma strict

private var animacion: Animator;

function Start () {
	animacion = GetComponent(Animator);
}

function Update () {
	if(GetComponent(Stats).isDead()){
		animacion.SetBool ("die", true);
	}
}