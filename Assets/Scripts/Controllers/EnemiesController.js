#pragma strict

private var spcialUsed: boolean;
private var actionChanged: boolean;
private var enemies: GameObject[];
private var attack: GameObject;

public var enemy: GameObject;

function Start () {
	actionChanged = false;
	spcialUsed = false;
	enemies = Statics.findEnemies();
}

function Update () {
	if(!actionChanged){
		actionChanged = true;

		attack = atacar();
		if(attack.GetComponent(AttackMany) != null){
			attack.GetComponent(AttackMany).enemies = Statics.findPlayers();
			attack.GetComponent(AttackMany).aggressor = enemy;
		}else{
			attack.GetComponent(Attack).enemy = randomObjetive();
			attack.GetComponent(Attack).aggressor = enemy;
		}
	}

	if(attack == null && actionChanged){
		Statics.turnManager().next();
		Destroy(gameObject);
	}
}

function atacar(){
	var stats = enemies[0].GetComponent(Stats);

	if(stats.percentLife() < 30.0f && !spcialUsed){
		spcialUsed = true;
		return Instantiate(stats.actions(2)[0],enemies[0].transform.position,transform.rotation);
	}else{
		var randomOption = Random.Range(0, 2);
		var randomAction = Random.Range(0, stats.actions(randomOption).length);

		return Instantiate(stats.actions(randomOption)[randomAction],enemies[0].transform.position,transform.rotation);
	}
}

function randomObjetive(){
	var players = Statics.findPlayers();
	return players[Random.Range(0,players.length)];
}