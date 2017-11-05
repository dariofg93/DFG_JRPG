#pragma strict

private var textMesh: TextMesh;
private var stats: Stats;

function Start () {
	textMesh = GetComponent(TextMesh);
	stats = transform.parent.GetComponent(Stats);
}

function Update () {
	textMesh.text = stats.nick + "\n" +
					"Vida: " + stats.currentLife + "/" + stats.life + "\n" +
					"Mana: " + stats.currentMana + "/" + stats.mana;
}
