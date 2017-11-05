#pragma strict

private var staticPosition: Vector3;

function Start () {
	staticPosition = transform.position;
}

function Update () {
	transform.position = staticPosition;
}
