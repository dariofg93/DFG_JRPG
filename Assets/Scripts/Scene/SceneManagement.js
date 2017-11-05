#pragma strict

public var failPoster: GameObject;
public var failMusic: AudioClip;

public var wonScreen: GameObject;
public var unfadeSound: AudioClip;
public var lifeInRuinsSound: AudioClip;

private var getAudio: AudioSource;
private var alreadyLost: boolean;
private var alreadyWon: boolean;

function Start () {
	alreadyLost = false;
	alreadyWon = false;
	getAudio = GetComponent(AudioSource);
}

function Update () {
	if(Statics.playerIsDead() && !alreadyLost){
		alreadyLost = true;

		loadAndReproduce(failMusic);

		Instantiate(failPoster,transform.position,transform.rotation);
	}

	if(Statics.enemiesAreDead() && !alreadyWon){
		alreadyWon = true;

		Statics.fogSpawner().active = false;

		Instantiate(wonScreen,transform.position,transform.rotation);
		loadAndReproduce(unfadeSound);

		waitAndReproduce();
	}
}

function loadAndReproduce(clip: AudioClip){
	getAudio.clip = clip;
	getAudio.Play();
}

function waitAndReproduce(){
	yield WaitForSeconds(getAudio.clip.length);
	loadAndReproduce(lifeInRuinsSound);
	getAudio.loop = true;
}