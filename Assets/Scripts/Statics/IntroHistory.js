class IntroHistory { 
	private var histories: Array;

	public function IntroHistory(){
		histories = new Array();

		histories.push("Hola");
		histories.push("introduccion");
		histories.push("problemas");
		histories.push("inicio batalla");
	}

	public function getStories(){
		return histories;
	}
}
