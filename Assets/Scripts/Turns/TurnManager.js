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

	if(mutex){
		mutex = false;
		initPjs();
		var pj = pjs.shift();

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
			return b.GetComponent(StatsPlayer).velocity - a.GetComponent(StatsPlayer).velocity;
		});

		var foundEnemies = Statics.findEnemies();
		foundEnemies.sort(function(a: GameObject, b: GameObject){
			return b.GetComponent(StatsEnemy).velocity - a.GetComponent(StatsEnemy).velocity;
		});

		while(foundPlayers.length > 0 && foundEnemies.length > 0){
			var pj: GameObject = foundPlayers[0];
			var enemy: GameObject = foundEnemies[0];

			if(pj.GetComponent(StatsPlayer).velocity > enemy.GetComponent(StatsEnemy).velocity){
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