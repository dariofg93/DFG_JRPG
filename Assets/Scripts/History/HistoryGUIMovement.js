#pragma strict

public var maxSpeed: float;

function Start () {}

function Update () {
	var posX = transform.position;
	var velocityX = new Vector3(maxSpeed * Time.deltaTime, 0, 0);
	posX += velocityX;

	transform.position = posX;
}