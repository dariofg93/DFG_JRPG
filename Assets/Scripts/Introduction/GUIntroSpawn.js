#pragma strict

public var TextPrefab: GameObject;

private var currentX: float;
private var currentY: float;

private var stories: Array;
private var spawnHistory: boolean;
private var spawnedStories: Array;

function Start () {
	currentX = (Statics.limitX - 5f) * (-1);
	currentY = Statics.limitY - 3f;

	spawnedStories = new Array();
	stories = new IntroHistory().getStories();
	spawnHistory = false;
}

function Update () {
	if(Statics.introductionScreen() == null){
		destroySpawnedStories();
		Destroy(gameObject);
	}

	if(!spawnHistory){
		spawnHistory = true;
		if(stories.length > 0){
			var history = Instantiate(TextPrefab,new Vector3(currentX,currentY,-10),transform.rotation);
			history.GetComponent(TextMesh).text = stories.shift();
			spawnedStories.push(history);
		}

		currentX += 3;
		currentY -= 4;
	}

	if(Input.GetKeyDown("space") || Input.GetKeyDown("a")){
		spawnHistory = false;
	}
}

function destroySpawnedStories(){
	for(var i = 0; i < spawnedStories.length; i++) {
	    Destroy(spawnedStories[i]);
	}
}