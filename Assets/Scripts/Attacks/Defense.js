/*#pragma strict

public var effect: int;
public var cost: int;

public var pj: GameObject;
public var benefited: GameObject;
public var defensePrefab: GameObject;

private var endAttack: boolean;

function Start () {
	endAttack = false;
}

function Update () {
	if(!endAttack){
		endAttack = true;
		var danio = new Damage().calculate(aggressor.GetComponent(Stats),enemy,damage,cost,hitProbability);

		var damageFeedBack = Instantiate(damagePrefab,enemy.transform.position - new Vector3(0,0,1),enemy.transform.rotation);
		damageFeedBack.GetComponent(TextMesh).text = danio;
	}
}
*/