#pragma strict

private var spcialUsed: boolean;
private var actionChanged: boolean;
private var enemies: GameObject[];
private var attack: GameObject;

public var enemy: GameObject;
public var heal: GameObject;
public var damage: GameObject;

function Start () {
	actionChanged = false;
	spcialUsed = false;
	enemies = Statics.findEnemies();
}

function Update () {
	if(!actionChanged){
		var action = atacar();

		if(Statics.hasEnoughMana(enemy,action)){
			actionChanged = true;
			attack = Instantiate(action,enemy.transform.position,transform.rotation);

			if(attack.GetComponent(AttackMany) != null){
				attack.GetComponent(AttackMany).enemies = Statics.playersLive();
				attack.GetComponent(AttackMany).aggressor = enemy;
				attack.GetComponent(AttackMany).damagePrefab = damage;
			}else{
				attack.GetComponent(Attack).enemy = randomObjetive();
				attack.GetComponent(Attack).aggressor = enemy;
				attack.GetComponent(Attack).damagePrefab = damage;
			}
		}
	}

	if(attack == null && actionChanged){
		Statics.turnManager().next();
		Destroy(gameObject);
	}
}

function atacar(){
	var stats = enemy.GetComponent(Stats);

	if(stats.percentLife() < 30.0f && !spcialUsed){
		spcialUsed = true;
		return Instantiate(stats.actions(2)[0],enemies[0].transform.position,transform.rotation);
	}else{
		var randomOption = Random.Range(0, 2);
		var randomAction = Random.Range(0, stats.actions(randomOption).length);

		return stats.actions(randomOption)[randomAction];
	}
}

function randomObjetive(){
	var players = Statics.playersLive();
	return players[Random.Range(0,players.length)];
}