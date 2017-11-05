class Heal { 
	public function calculate(curator: Stats, cured: Stats, effect, cost):String {
		var retorno: String;
		curator.currentMana = Mathf.Max(curator.currentMana-cost,0);

		retorno = cured.recibirCura(effect).ToString();
		return retorno;
	}
}