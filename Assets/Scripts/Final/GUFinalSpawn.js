#pragma strict

public var TextPrefab: GameObject;

private var currentX: float;
private var currentY: float;

private var stories: Array;
private var spawnHistory: boolean;

function Start () {
	currentX = (Statics.limitX - 5f) * (-1);
	currentY = Statics.limitY - 3f;

	stories = new FinalHistory().getStories();
	spawnHistory = false;
}

function Update () {
	if(!spawnHistory && transform.parent.GetComponent(SceneUnfade).alpha > 1){
		spawnHistory = true;
		if(stories.length > 0){
			var history = Instantiate(TextPrefab,new Vector3(currentX,currentY,-14),transform.rotation);
			history.GetComponent(TextMesh).text = stories.shift();
		}

		currentX += 3;
		currentY -= 4;
	}

	if(Input.GetKeyDown("space") || Input.GetKeyDown("a")){
		spawnHistory = false;
	}
}