#pragma strict

public var camara: Transform;
public var fogs: GameObject[] = new GameObject[2];	//fogs[0] = whiteFog && fogs[1] = blackFog
public var spawnAltas: float;
public var spawnBajas: float;

private var timerAltas: float;
private var timerBajas: float;
private var orientacion: float;

function Start () {
	timerAltas = 0f;
	timerBajas = 0f;
	orientacion = 1f;
}

function Update () {
	timerAltas += Time.deltaTime;
	timerBajas += Time.deltaTime;

	if (timerAltas >= spawnAltas) {
		var fog = fogs[Random.Range(0, fogs.Length)];
		var alta = Instantiate(fog, new Vector3((Statics.limitX + 15f) * orientacion, Statics.limitY - 5f, -6f), camara.rotation);
		if(alta.transform.position.x >= 0f)
			alta.GetComponent(FogMovement).maxSpeed = 2.5f;
		else
			alta.GetComponent(FogMovement).maxSpeed = -2.5f;

		alta.GetComponent(SelfDestruct).destroyTime = 30f;
		timerAltas = 0f;

		orientacion *= -1;
	}

	if(timerBajas >= spawnBajas){
		var baja = Instantiate(fogs[0], new Vector3((Statics.limitX + 15f) * orientacion, Statics.limitY - 15f, -6f), camara.rotation);
		if(baja.transform.position.x >= 0f)
			baja.GetComponent(FogMovement).maxSpeed = 5f;
		else
			baja.GetComponent(FogMovement).maxSpeed = -5f;

		baja.GetComponent(SelfDestruct).destroyTime = 15f;
		timerBajas = 0f;

		orientacion *= -1;
	}
}
