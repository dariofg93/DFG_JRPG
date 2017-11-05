#pragma strict

public var speed: float;
public var maxSize: float;

private var x: float;
private var y: float;
private var z: float;

function Start () {}

function Update () {
	if(transform.localScale.x < maxSize){
		x += speed * Time.deltaTime;
		y += speed * Time.deltaTime;
		z += speed * Time.deltaTime;

		transform.localScale += new Vector3(x,y,z);
	}
}
