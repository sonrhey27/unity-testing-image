using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.Networking;
using System;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class ButtonScript : MonoBehaviour
{
  AudioSource audioSource;
  AudioClip audioClip;
  public Image targetImage;
  void Start()
  {
#if !UNITY_EDITOR && UNITY_WEBGL
      // disable WebGLInput.captureAllKeyboardInput so elements in web page can handle keabord inputs
      WebGLInput.captureAllKeyboardInput = false;
#endif
  }

  IEnumerator GetAudioClip()
  {
    using (UnityWebRequest www = UnityWebRequestMultimedia.GetAudioClip("http://localhost:3000/audio", AudioType.WAV))
    {
      yield return www.SendWebRequest();
      if (www.result == UnityWebRequest.Result.ConnectionError)
      {
        Debug.Log(www.error);
      }
      else
      {
        audioClip = DownloadHandlerAudioClip.GetContent(www);
        audioSource.clip = audioClip;
        audioSource.Play();
      }
    }
  }

  IEnumerator GetImage()
  {
    UnityWebRequest www = UnityWebRequestTexture.GetTexture("http://localhost:3000/photo");
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.ConnectionError)
    {
      Debug.Log(www.error);
    }
    else
    {
      //var texture = DownloadHandlerTexture.GetContent(www);
      Texture2D myTexture = DownloadHandlerTexture.GetContent(www);

      Sprite newSprite = Sprite.Create(myTexture, new Rect(0, 0, myTexture.width, myTexture.height), new Vector2(.5f, .5f));
      targetImage.sprite = newSprite;
    }
  }

  public void DisplayImage()
  {
    StartCoroutine(GetImage());
    //displayTextValue.text = text + "sds";
  }

  public void PlayAudio()
  {
    audioSource = GetComponent<AudioSource>();
    StartCoroutine(GetAudioClip());
  }
}
