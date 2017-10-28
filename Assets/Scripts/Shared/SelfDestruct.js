#pragma strict

public var destroyTime: float;

function Start () {
	
}

function Update () {
	Destroy(gameObject, destroyTime);
}
