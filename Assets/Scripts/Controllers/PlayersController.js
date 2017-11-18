//Variables necesarias para el turno del jugador.
private var dialog1Invoked: boolean;
private var dialog2Invoked: boolean;

private var changedOption: boolean;
private var changedAction: boolean;

private var optionsGUI: GameObject;
private var actionsGUI: GameObject;

private var pos: int;
private var attack: GameObject;

//Variables necesarias para la creacion de dialogos.
private var initPosX: float;
private var initPosY: float;
private var initPosZ: float;

//Prefab de dialogo
public var dialog: GameObject;
public var heal: GameObject;
public var damage: GameObject;
public var feedBackMana: GameObject;

public var pj: GameObject;

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
	if(!dialog1Invoked && Statics.introductionScreen() == null){
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

			var action = pj.GetComponent(Stats).actions(pos)[actionsSelect.selected];

			if(Statics.hasEnoughMana(pj,action)){
				changedAction = true;
				attack = Instantiate(action,pj.transform.position,pj.transform.rotation);

				if(attack.GetComponent(Attack) != null){
					attack.GetComponent(Attack).enemy = Statics.findEnemies()[0];
					attack.GetComponent(Attack).aggressor = pj;
					attack.GetComponent(Attack).damagePrefab = damage;
				}else{
					attack.GetComponent(Healing).pj = pj;
					attack.GetComponent(Healing).players = Statics.playersLive();
					attack.GetComponent(Healing).healingPrefab = heal;
				}
			}else{
				Instantiate(feedBackMana,pj.transform.position - new Vector3(0,0,1),pj.transform.rotation);
				actionsSelect.changedOption = false;
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

	var variables = actionsGUI.GetComponent(DialogVariables);	
	variables.pj = pj;
	variables.pos = pos;

	var textGUI = Statics.gameObjectOfChildByName(actionsGUI,"DialogTextGUI").GetComponent("TextMesh");
	var namePj = "				" + pj.GetComponent(Stats).nick;

		if(!dialog1Invoked){
			textGUI.text = namePj + "\n" + "Ataque" + "\n" + "Magia" + "\n" + "Inventario";
			actionsGUI.GetComponent(DialogVariables).isOptions = true;
		}
		else{
			variables.playersController = gameObject;
			var actions:GameObject[] = pj.GetComponent(Stats).actions(pos);
			textGUI.text = namePj + "\n" + Statics.namesOfGameObjects(actions).join("\n");
		}

	initPosX += 1;
	initPosY += 1;
	initPosZ += 1;

	return actionsGUI;				
}

function deleteActionsGUI(){
	Statics.gameObjectOfChildByName(optionsGUI,"DialogSelect").GetComponent(CursorMovement).changedOption = false;

	Destroy(actionsGUI);
	actionsGUI = null;
	dialog2Invoked = false;
	changedOption = false;

	initPosX -= 1;
	initPosY -= 1;
	initPosZ -= 1;
}