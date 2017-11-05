#pragma strict

public var playersController: GameObject;
public var enemiesController: GameObject;

public var mutex: boolean;
public var pjs: Array;

function Start () {
	pjs = new Array();
	mutex = true;
}

function Update () {

	if(mutex && !Statics.playerIsDead() && !Statics.enemiesAreDead()){
		mutex = false;
		initPjs();
		var pj = firstUndeadPj();

		if(Statics.arrayContains(Statics.findPlayers(),pj)){
			var pjAttack = Instantiate(playersController,transform.position,transform.rotation);
			pjAttack.GetComponent(PlayersController).pj = pj;

		}else{
			var enemyAttack = Instantiate(enemiesController,transform.position,transform.rotation);
			enemyAttack.GetComponent(EnemiesController).enemy = pj;
		}
	}
}

function initPjs(): Array {
	if(pjs.length == 0){

		var foundPlayers = Statics.findPlayers();
		foundPlayers.sort(function(a: GameObject, b: GameObject){
			return b.GetComponent(Stats).velocity - a.GetComponent(Stats).velocity;
		});

		var foundEnemies = Statics.findEnemies();
		foundEnemies.sort(function(a: GameObject, b: GameObject){
			return b.GetComponent(Stats).velocity - a.GetComponent(Stats).velocity;
		});

		while(foundPlayers.length > 0 && foundEnemies.length > 0){
			var pj: GameObject = foundPlayers[0];
			var enemy: GameObject = foundEnemies[0];

			if(pj.GetComponent(Stats).velocity > enemy.GetComponent(Stats).velocity){
				pjs.push(foundPlayers.shift());
			}else{
				pjs.push(foundEnemies.shift());
			}
		}

		pjs = pjs.concat(foundPlayers);
		pjs = pjs.concat(foundEnemies);
	}
}

function next(){
	mutex = true;
}

function firstUndeadPj(){
	var pj: GameObject = pjs.shift();

	while(pj.GetComponent(Stats).isDead()){
		initPjs();
		pj = pjs.shift();
	}

	return pj;
}