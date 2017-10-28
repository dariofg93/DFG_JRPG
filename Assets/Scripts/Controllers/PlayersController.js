//Variables necesarias para el turno del jugador.
private var dialog1Invoked: boolean;
private var dialog2Invoked: boolean;

private var changedOption: boolean;
private var changedAction: boolean;

private var optionsGUI: GameObject;
private var actionsGUI: GameObject;

private var pos: int;
private var attack: GameObject;

public var pj: GameObject;

//Variables necesarias para la creacion de dialogos.
private var initPosX: float;
private var initPosY: float;
private var initPosZ: float;

//Prefab de dialogo
public var dialog: GameObject;

function Start () {
	dialog1Invoked = false;
	dialog2Invoked = false;
	changedOption = false;
	changedAction = false;

	initPosX = 9.5;
	initPosY = 3.5;
	initPosZ = 7;
}

function Update () {
	if(!dialog1Invoked){
		optionsGUI = invokeGUI();
		dialog1Invoked = true;
	}

	if(optionsGUI != null){
		var optionsSelect = Statics.gameObjectOfChildByName(optionsGUI,"DialogSelect").GetComponent(CursorMovement);
		if(optionsSelect.changedOption){
			changedOption = true;
			pos = optionsSelect.selected;
		}
	}

	if(changedOption && !dialog2Invoked){
		dialog2Invoked = true;
		actionsGUI = invokeGUI();
	}

	if(actionsGUI != null){
		var actionsSelect = Statics.gameObjectOfChildByName(actionsGUI,"DialogSelect").GetComponent(CursorMovement);
		if(actionsSelect.changedOption && !changedAction){
			changedAction = true;
			var action = pj.GetComponent(StatsPlayer).actions(pos)[actionsSelect.selected];

			attack = Instantiate(action,pj.transform.position,pj.transform.rotation);

			if(attack.GetComponent(Attack) != null){
				attack.GetComponent(Attack).enemy = Statics.findEnemies()[0];
				attack.GetComponent(Attack).aggressor = pj;
			}else{
				attack.GetComponent(Defense).players = Statics.findPlayers();
			}
		}
	}

	if(changedAction){
		Destroy(optionsGUI);
		Destroy(actionsGUI);
	}

	if(attack == null && changedAction){
		Statics.turnManager().next();
		Destroy(gameObject);
	}
}

function invokeGUI(){
	var actionsGUI = Instantiate(dialog, 
						new Vector3(Statics.limitX * (-1) + initPosX, 
									Statics.limitY - initPosY,
									initPosZ * (-1)),
									transform.rotation);

	actionsGUI.GetComponent(DialogVariables).pj = pj;
	actionsGUI.GetComponent(DialogVariables).pos = pos;

	var textGUI = Statics.gameObjectOfChildByName(actionsGUI,"DialogTextGUI");
		if(!dialog1Invoked){
			textGUI.GetComponent("TextMesh").text = "Ataque" + "\n" + "Magia" + "\n" + "Inventario";
			actionsGUI.GetComponent(DialogVariables).isOptions = true;
		}
		else{
			var actions:GameObject[] = pj.GetComponent(StatsPlayer).actions(pos);
			textGUI.GetComponent("TextMesh").text = Statics.namesOfGameObjects(actions).join("\n");
		}

	initPosX += 1;
	initPosY += 1;
	initPosZ += 1;

	return actionsGUI;				
}
