class FinalHistory { 
	private var histories: Array;

	public function FinalHistory(){
		histories = new Array();

		histories.push("Tragedia");
		histories.push("conclusion");
		histories.push("Chau");
	}

	public function getStories(){
		return histories;
	}
}
