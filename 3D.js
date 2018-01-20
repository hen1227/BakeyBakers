using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour 
{
	private Transform CameraTransform = null;
	private Vector3 CamerasForwardVector;
	private float CameraElevation = 1.8f;
	private const float MinCameraDistance = 0.5f;
	private const float MaxCameraDistance = 3f;
	private const float MinCameraHeight = 0.3f;
	private const float MaxCameraHeight = 4f;
	private const float ThirdPersonCameraTurnSpeed = 2f;
	protected enum CameraModes {FirstPerson, ThirdPerson};
	private CameraModes CameraMode = CameraModes.ThirdPerson;
	private Transform FirstPersonCameraTransformSave = null;
	private Transform ThirdPersonCameraTransformSave = null;
	private float HeadYaw = 0f;
	private const float HeadYawRate = 0.05f;
	private const float MaxHeadYaw = 75f;
	private float HeadPitch = 0f;
	private const float HeadPitchRate = 0.05f;
	private const float MaxHeadPitch = 48f;
	public const float EyeHeight = 1.68f;	//1.68m is an average man.
	private GameObject CrossHairsTexture = null;	
	

	// Use this for initialization
	void Start () 
	{
		CameraTransform = transform;
		CameraTransform.LookAt(CameraTransform.parent.localPosition+Vector3.up * EyeHeight, Vector3.up);
		CrossHairsTexture = GameObject.Find ("CrossHairs");
	}

	void Update()
	{

	}


	// Update is called once per frame
	void LateUpdate () 
	{
		if (!CameraTransform) Debug.Log ("Please assign the CameraController script to a Camera object.");
		else 
		{
			
			if (Input.GetButtonDown ("RightThumbStickButton"))
			{
				if (CameraMode == CameraModes.ThirdPerson)
				{
					CameraMode = CameraModes.FirstPerson;
					ThirdPersonCameraTransformSave = CameraTransform;
			
					CrossHairsTexture.guiTexture.enabled = true;
/*					CameraTransform.localPosition = new Vector3(0f,EyeHeight,0.035f);	//Offset because model is not zero'ed on the Z axis.
					CameraTransform.localRotation = Quaternion.identity;
*/				}
				else
				{ 
					CameraMode = CameraModes.ThirdPerson;
					FirstPersonCameraTransformSave = CameraTransform;
				//		CameraTransform = ThirdPersonCameraTransformSave;
					CameraElevation = EyeHeight + 0.1f;
					CameraTransform.localPosition = new Vector3(0f, CameraElevation, -1.5f);	//Offset because model is not zero'ed on the Z axis.

					CrossHairsTexture.guiTexture.enabled = false;
					//CameraTransform.localRotation = Quaternion.identity * Quaternion.AngleAxis(0f, Vector3.up);

				}
			}
			

			if (CameraMode == CameraModes.FirstPerson)
			{
				ControlFirstPersonCamera();		
				//EvasMesh.enabled = false;
			}
			else
			{
				//EvasMesh.enabled = true;
				ControlThirdPersonCamera();
	
			}
		}
	}


	void ControlFirstPersonCamera()
	{
		float RightThumbHoriz = Input.GetAxis ("RightThumbHorizontal");
		float RightThumbVert = Input.GetAxis ("RightThumbVertical");
		float HorizontalDirection = Mathf.Sign (RightThumbHoriz);
		float VerticalDirection = Mathf.Sign (RightThumbVert);

/*		
		if (Input.GetButton("Fire4")) 
		{
			CameraTransform.localPosition = new Vector3(0f,EyeHeight-0.2f,0.9f);
			
		}
			else CameraTransform.localPosition = new Vector3(0f,EyeHeight,0.025f);	*/

		CameraTransform.localPosition = new Vector3(0f,EyeHeight,0.025f);	
		CameraTransform.localRotation = Quaternion.identity;		
		if (RightThumbHoriz != 0f)
		{
			HeadYaw += HeadYawRate * HorizontalDirection ;
			if (HorizontalDirection > 0 && HeadYaw > RightThumbHoriz) HeadYaw = RightThumbHoriz;
			if (HorizontalDirection < 0 && HeadYaw < RightThumbHoriz) HeadYaw = RightThumbHoriz;
			CameraTransform.RotateAround (CameraTransform.position, Vector3.up, MaxHeadYaw * HeadYaw);
		}
		else
		{
			if (HeadYaw > 0.05)
			{
				HeadYaw -= HeadYawRate;
				CameraTransform.RotateAround (CameraTransform.position, Vector3.up, MaxHeadYaw * HeadYaw);
			}
			else if (HeadYaw < -0.05) 
			{
				HeadYaw += HeadYawRate;
				CameraTransform.RotateAround (CameraTransform.position, Vector3.up, MaxHeadYaw * HeadYaw);
			}
			else HeadYaw = 0f;

			
		}

		if (RightThumbVert !=0)
		{
			HeadPitch += HeadPitchRate * VerticalDirection;
			if (VerticalDirection > 0 && HeadPitch > RightThumbVert) HeadPitch = RightThumbVert;
			if (VerticalDirection < 0 && HeadPitch < RightThumbVert) HeadPitch = RightThumbVert;
			
			CameraTransform.RotateAround (CameraTransform.position, CameraTransform.right, MaxHeadPitch * HeadPitch);
		}
		else
		{
			if (HeadPitch > 0.05)
			{
				HeadPitch -= HeadPitchRate;
				CameraTransform.RotateAround (CameraTransform.position, CameraTransform.right, MaxHeadPitch * HeadPitch);
			}
			else if (HeadPitch < -0.05) 
			{
				HeadPitch += HeadPitchRate;
				CameraTransform.RotateAround (CameraTransform.position, CameraTransform.right, MaxHeadPitch * HeadPitch);
			}
			else HeadPitch = 0f;
		}
	}

	
	void ControlThirdPersonCamera()
	{
		float RightThumbHoriz = Input.GetAxis ("RightThumbHorizontal");
		float RightThumbVert = Input.GetAxis ("RightThumbVertical");
		Vector2 XZPlaneCameraPosition;
		bool CameraPositionchanged = false;
		float TurnAngle;


		XZPlaneCameraPosition = new Vector2(CameraTransform.localPosition.x, CameraTransform.localPosition.z);		
		//Get a normalized 2D camera's forward vector in 3D.
		//CamerasForwardVector = CameraTransform.TransformDirection (Vector3.forward);
		
		//CamerasForwardVector.y = 0;
		
		//Rotate Camera	
		if (RightThumbHoriz != 0f)
		{
			TurnAngle = -RightThumbHoriz * ThirdPersonCameraTurnSpeed * Time.deltaTime;
			//CameraTransform.RotateAround (CameraTransform.parent.position, Vector3.up, 90f * Time.deltaTime * RightThumbHoriz);
			XZPlaneCameraPosition.x = XZPlaneCameraPosition.x * Mathf.Cos(TurnAngle) - XZPlaneCameraPosition.y * Mathf.Sin(TurnAngle);
			XZPlaneCameraPosition.y = XZPlaneCameraPosition.x * Mathf.Sin(TurnAngle) + XZPlaneCameraPosition.y * Mathf.Cos(TurnAngle);
			CameraPositionchanged = true;
		}
		
		//Hoist Camera
		if (RightThumbVert != 0) 
		{
			//CameraElevation += 0.75f * RightThumbVert * Time.deltaTime;
			CameraElevation = CameraTransform.localPosition.y + 0.75f * RightThumbVert * Time.deltaTime;
			
			CameraPositionchanged = true;
		}
		
		//Zoom Camera
		if (Input.GetKey (KeyCode.PageDown)) 
		{
			//CamerasForwardVector = CameraTransform.forward;
			//CamerasForwardVector = CamerasForwardVector.normalized;
			//CameraTransform.position += -CamerasForwardVector * Time.deltaTime;
			XZPlaneCameraPosition *= (1f + (Time.deltaTime * 2f));			

			//XZPlaneCameraPosition = new Vector2(CameraTransform.localPosition.x, CameraTransform.localPosition.z);

			if (XZPlaneCameraPosition.magnitude > MaxCameraDistance)
			{
				XZPlaneCameraPosition.Normalize ();
				XZPlaneCameraPosition *= MaxCameraDistance;
				/*CameraTransform.localPosition = new Vector3(XZPlaneCameraPosition.x, CameraElevation, XZPlaneCameraPosition.y);
				CameraTransform.LookAt(CameraTransform.parent.localPosition+Vector3.up * EyeHeight, Vector3.up);*/
				CameraElevation = CameraTransform.localPosition.y;
			}
			CameraPositionchanged = true;

			/*			CamerasForwardVector = CameraTransform.forward;
			CamerasForwardVector = CamerasForwardVector.normalized;
			CameraTransform.position += -CamerasForwardVector * Time.deltaTime * 1f * RightThumbVert;
			
			XZPlaneCameraPosition = new Vector2(CameraTransform.localPosition.x, CameraTransform.localPosition.z);
			if (XZPlaneCameraPosition.magnitude < MinCameraDistance)
			{
				XZPlaneCameraPosition.Normalize ();
				XZPlaneCameraPosition *= MinCameraDistance;
				CameraTransform.localPosition = new Vector3(XZPlaneCameraPosition.x, CameraElevation, XZPlaneCameraPosition.y);
				CameraTransform.LookAt(CameraTransform.parent.position+Vector3.up * 1.68f, Vector3.up);
			}
*/
		}
		if (Input.GetKey (KeyCode.PageUp)) 
		{
			//CamerasForwardVector = CameraTransform.forward;
			//CamerasForwardVector = CamerasForwardVector.normalized;
			//CameraTransform.position -= -CamerasForwardVector * Time.deltaTime;
			XZPlaneCameraPosition *= (1f - (Time.deltaTime * 2f));			

			if (XZPlaneCameraPosition.magnitude < MinCameraDistance)
			{
				XZPlaneCameraPosition.Normalize ();
				XZPlaneCameraPosition *= MinCameraDistance;
				/*CameraTransform.localPosition = new Vector3(XZPlaneCameraPosition.x, CameraElevation, XZPlaneCameraPosition.y);
				CameraTransform.LookAt(CameraTransform.parent.localPosition+Vector3.up * EyeHeight, Vector3.up);*/
				CameraElevation = CameraTransform.localPosition.y;
			}
			CameraPositionchanged = true;			
		}

		if (CameraPositionchanged)
		{
			if (CameraElevation > MaxCameraHeight) CameraElevation = MaxCameraHeight;
			else if (CameraElevation < MinCameraHeight) CameraElevation = MinCameraHeight;
			
			CameraTransform.localPosition = new Vector3(XZPlaneCameraPosition.x, CameraElevation, XZPlaneCameraPosition.y);
			//CameraTransform.localPosition = new Vector3(CameraTransform.localPosition.x, CameraElevation, CameraTransform.localPosition.z);
			CameraTransform.LookAt(CameraTransform.parent.localPosition+Vector3.up * EyeHeight, Vector3.up);
			
		}
		
	}


}
