#pragma strict

private var staticYpos: float;

function Start () {
	staticYpos = transform.position.y;
}

function Update () {
	var tmp: Vector3 = transform.position;
	tmp.y = staticYpos;

	transform.position = tmp;
}
