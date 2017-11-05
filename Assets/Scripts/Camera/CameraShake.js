private var originPosition:Vector3;
private var originRotation:Quaternion;
private var shake_decay: float;
private var shake_intensity: float;

private var rotX: float;
private var rotY: float;

private var posX: float;
private var posY: float;
private var posZ: float;

public var isShake: boolean;

function start(){
	rotX = originRotation.x;
	rotY = originRotation.y;

	posX = transform.position.x;
	posY = transform.position.y;
	posZ = transform.position.z;

	isShake = false;
}

function Update(){
	if(shake_intensity > 0){
		transform.position = originPosition + Random.insideUnitSphere * shake_intensity;
		transform.rotation = Quaternion(
		originRotation.x,
		originRotation.y + Random.Range(-shake_intensity,shake_intensity)*.2,
		originRotation.z,
		originRotation.w);
		shake_intensity -= shake_decay;
	}
	else{
		transform.rotation = Quaternion(rotX,rotY,originRotation.z,originRotation.w);
	}

	if(isShake){
		shake();
		isShake = false;
	}
}

function shake(){
	originPosition = transform.position;
	originRotation = transform.rotation;
	shake_intensity = .2;
	shake_decay = 0.01;
}