#pragma strict

private var counter: float;

public var initColor: Color;
public var finishColor: Color;

public var speed: float;

function Start () {}

function Update () {
	counter += Time.deltaTime;
	GetComponent(TextMesh).color = Color.Lerp(initColor,finishColor, counter * speed);
}
