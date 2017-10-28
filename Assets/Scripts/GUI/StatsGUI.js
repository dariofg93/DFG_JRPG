#pragma strict

private var textMesh: TextMesh;
private var stats: Stats;

function Start () {
	textMesh = GetComponent(TextMesh);
	stats = transform.parent.GetComponent(Stats);
}

function Update () {
	textMesh.text = stats.nick + "\n" +
					"Vida: " + stats.life + "/" + stats.currentLife + "\n" +
					"Mana: " + stats.mana + "/" + stats.currentMana;
}
