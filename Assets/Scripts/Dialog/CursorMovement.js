#pragma strict

public var selected: int;
public var changedOption: boolean;

private var variables: DialogVariables;
private var maxCapacity: int;

function Start () {
	selected = 0;
	changedOption = false;
	variables = transform.parent.GetComponent(DialogVariables);
}

function Update () {
	if(!changedOption){
		if(variables.isOptions){
			maxCapacity = 3;
		}else{
			maxCapacity = variables.pj.GetComponent(Stats).actions(variables.pos).length;	
		}

		moveArrow(KeyCode.DownArrow,selected < maxCapacity-1,-1);
		moveArrow(KeyCode.UpArrow,selected > 0,1);

		if(Input.GetKeyDown("a")){
			changedOption = true;
		}

		if(Input.GetKeyDown("s") && !variables.isOptions){
			variables.playersController.GetComponent(PlayersController).deleteActionsGUI();
			Destroy(transform.parent.gameObject);
		}
	}
}

function moveArrow(arrow: KeyCode,condition: boolean,orientation: float){
	if(Input.GetKeyDown(arrow) && condition){
		transform.position += new Vector3(0f,1.35f * orientation,0f);
		selected += (-1) * orientation;
	}
}
