class IntroHistory { 
	private var histories: Array;

	public function IntroHistory(){
		histories = new Array();

		histories.push("Aun recuerdo esa noche en el bosque...");
		histories.push("...habia una casa." + "\n" + "Desde el primer momento crei que era estupido ir a ver...");
		histories.push("...la curiosidad fue mas fuerte, gran error..." + "\n" + "Cuando estabamos por entrar aparecio...");
		histories.push("Era terrorifica, recuerdo que por alguna razon se me hizo conocida, " + "\n" + "pero no me fije mucho en eso debido a que no podia dejar de ver como se movia..." + "\n" + "...tenia miedo...");
	}

	public function getStories(){
		return histories;
	}
}
