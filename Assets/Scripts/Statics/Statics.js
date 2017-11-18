public static var limitX : float = 20.0f;
public static var limitY : float = 10.0f;

public static function gameObjectOfChildByName(gameObject,name){
   return gameObject.transform.Find(name);
}

public static function namesOfGameObjects(gameObjects: GameObject[]){
	var names: Array = new Array();

	for(var go in gameObjects){
		names.push(go.name);
	}

	return names;
}

public static function fogSpawner(): GameObject{
	return GameObject.Find("FogSpawner");
}

public static function findPlayers(): Array{
	return GameObject.FindGameObjectsWithTag("Player");
}

public static function findEnemies(): Array{
	return GameObject.FindGameObjectsWithTag("Enemy");
}

public static function turnManager(): TurnManager{
	return GameObject.Find("TurnManager").GetComponent(TurnManager);
}

public static function playerIsDead(): boolean{
	return GameObject.Find("Player").GetComponent(Stats).isDead();
}

public static function playersLive(): Array{
	var alives = new Array();
	var players = findPlayers();

	for (var i = 0; i < players.length; i++) {
		if(!players[i].GetComponent(Stats).isDead()){
			alives.push(players[i]);
		}
	}

	return alives;
}

public static function enemiesAreDead(): boolean{
	var condition = true;
	var enemies = findEnemies();

	for (var i = 0; i < enemies.length; i++) {
		if(!enemies[i].GetComponent(Stats).isDead()){
			condition = false;
			break;
		}
	}

	return condition;
}

public static function arrayContains(array: Array,elem){
	var found = false;

	for(var i = 0; i < array.length; i++) {
	    if (array[i] == elem) {
	        found = true;
	        break;
	    }
	}

	return found;
}

public static function hasEnoughMana(pj: GameObject, action: GameObject){
	var totalCost: int;

	if(action.GetComponent(Attack) != null){
		totalCost = action.GetComponent(Attack).cost;
	}

	if(action.GetComponent(AttackMany) != null){
		totalCost = action.GetComponent(AttackMany).cost;
	}

	if(action.GetComponent(Healing) != null){
		totalCost = action.GetComponent(Healing).cost;
	}

	return pj.GetComponent(Stats).currentMana >= totalCost;
}

public static function introductionScreen(){
	return GameObject.Find("IntroductionScreen");
}

public static function soundEffect(){
	return GameObject.Find("SoundEffect");
}