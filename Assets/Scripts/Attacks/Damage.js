class Damage { 
	public function calculate(aggressor: Stats, enemy: GameObject, damage: int, cost: int, hitProbability: float): String{
		var retorno: String;
		aggressor.currentMana = Mathf.Max(aggressor.currentMana-cost,0);

		if(Random.Range(0,100) <= hitProbability){
			var danioTotal = enemy.GetComponent(Stats).recibirDanio(aggressor.attack + damage);
			retorno = danioTotal.ToString();
		}else{
			retorno = "Miss";
		}

		if(Statics.arrayContains(Statics.findPlayers(),enemy) && retorno != "Miss"){
			Camera.main.GetComponent(CameraShake).isShake = true;
		}

		return retorno;
	}
}
