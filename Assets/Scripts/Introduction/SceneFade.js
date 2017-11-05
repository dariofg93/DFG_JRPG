#pragma strict

public var initialColor: Material;
public var fadeVelocity: float;

private var ticks: int;
private var alpha: float;

function Start () {
	alpha = 1.0f;
	ticks = 0;
}

function Update () {
	if(ticks >= 4){
		gameObject.GetComponent.<Renderer>().material = initialColor;
		initialColor.color = new Color(0,0,0,alpha);
		alpha -= fadeVelocity * Time.deltaTime;

		if(alpha <= 0) Destroy(gameObject);
	}

	if(Input.GetKeyDown("space") || Input.GetKeyDown("a")){
		ticks++;
	}
}
