#pragma strict

public var dialoge: GameObject;
private var invoked: boolean;
private var animacion: Animator;

function Start () {
	invoked = false;
	animacion = GetComponent(Animator);
}

function Update () {
	if(GetComponent(Stats).isDead() && !invoked){
		invoked = true;
		Instantiate(dialoge,transform.position + new Vector3(0,5f,1f),transform.rotation);
		animacion.SetBool ("die", true);
	}
}
