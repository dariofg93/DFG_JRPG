#pragma strict

public var effect: int;
public var cost: int;

public var pj: GameObject;
public var players: GameObject[];
public var healingPrefab: GameObject;

private var endDefense: boolean;

function Start () {
	endDefense = false;
}

function Update () {
	if(!endDefense){
		endDefense = true;

		for(var player in players){
			var heal = new Heal().calculate(pj.GetComponent(Stats),player.GetComponent(Stats),effect,cost);

			var healFeedBack = Instantiate(healingPrefab,player.transform.position - new Vector3(0,0,1),player.transform.rotation);
			healFeedBack.GetComponent(TextMesh).text = heal;
		}
	}
}
