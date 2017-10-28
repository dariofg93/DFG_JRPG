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