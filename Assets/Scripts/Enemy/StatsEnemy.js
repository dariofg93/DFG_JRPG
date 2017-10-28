#pragma strict

public var nick: String;
public var life: int;
public var mana: int;
public var currentLife: int;
public var currentMana: int;

public var attack: int;
public var magic: int;
public var attackDefense: int;
public var magicDefense: int;
public var velocity: int;

private var gui: Hashtable = {};

public var physicistsAttacks: GameObject[];
public var magicalAttacks: GameObject[];
public var especial: GameObject[];

function Start () {
	currentLife = life;
	currentMana = mana;

	gui.Add(0,physicistsAttacks);
	gui.Add(1,magicalAttacks);
	gui.Add(2,especial);
}

function Update () {}

function actions(pos): GameObject[]{
	return gui[pos];
}

function percentLife(): float{
	return life * currentLife/100;
}