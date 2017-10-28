#pragma strict

private var textMesh: TextMesh;
private var stats: StatsEnemy;

function Start () {
	textMesh = GetComponent(TextMesh);
	stats = transform.parent.GetComponent(StatsEnemy);
}

function Update () {
	textMesh.text = stats.nick + "\n" +
					"Vida: " + stats.life + "/" + stats.currentLife + "\n" +
					"Mana: " + stats.mana + "/" + stats.currentMana;
}
