#pragma strict

public var initialColor: Material;
public var fadeVelocity: float;

private var ticks: int;
public var alpha: float;

function Start () {
	alpha = 0f;
}

function Update () {
	gameObject.GetComponent.<Renderer>().material = initialColor;
	initialColor.color = new Color(255,255,255,alpha);

	if(alpha < 250)
		alpha += fadeVelocity * Time.deltaTime;
}