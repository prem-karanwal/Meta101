import { loadGLTF, loadAudio } from "./libs/loader.js"
import { CSS3DObject } from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js"
const THREE = window.MINDAR.IMAGE.THREE
// import { mockWithImage } from "./libs/camera-mock.js"


document.addEventListener("DOMContentLoaded", () => {
    const start = async () => {
        // mockWithImage("./assets/Images/Metaverse.png")

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./assets/Images/targets.mind"
        })

        const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);




        let element = document.querySelector("#click-me")
        const obj = new CSS3DObject(document.querySelector("#image1"))
        const obj2 = new CSS3DObject(document.querySelector("#Welcome"))

        let obj3 = new CSS3DObject(element)
        const obj4 = new CSS3DObject(document.querySelector("#instruc"))
        const obj5 = new CSS3DObject(document.querySelector("#image2"))
        const obj6 = new CSS3DObject(document.querySelector("#what"))
        const obj7 = new CSS3DObject(document.querySelector("#image3"))
        const obj8 = new CSS3DObject(document.querySelector("#Ele"))
        const obj9 = new CSS3DObject(document.querySelector("#image4"))
        const obj10 = new CSS3DObject(document.querySelector("#AR"))
        const obj11 = new CSS3DObject(document.querySelector("#image5"))
        const obj12 = new CSS3DObject(document.querySelector("#VR"))
        const obj13 = new CSS3DObject(document.querySelector("#TY"))

        const cssAnchor = mindarThree.addCSSAnchor(0)
        cssAnchor.group.add(obj, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13)
        element.parent = obj3
        obj.visible = false
        obj4.visible = false
        obj5.visible = false
        obj6.visible = false
        obj7.visible = false
        obj8.visible = false
        obj9.visible = false
        obj10.visible = false
        obj11.visible=false
        obj12.visible=false
        obj13.visible=false


        const model = await loadGLTF("./assets/Models/buster_drone/scene.gltf")
        model.scene.scale.set(0.3, 0.3, 0.3)
        model.scene.userData.clickable = true
        const anchor = mindarThree.addAnchor(0)
        anchor.group.add(model.scene)

        let geo2 = new THREE.RingGeometry(0.08, 0.2, 8)
        let mat2 = new THREE.MeshLambertMaterial({ color: "#0FFFFF" })
        let mesh2 = new THREE.Mesh(geo2, mat2)
        mesh2.position.set(-0.6, 0, 0)
        const Geoanchor = mindarThree.addAnchor(0)
        let mesh3 = new THREE.Mesh(geo2, mat2)
        mesh3.position.set(0.6, 0, 0)
        Geoanchor.group.add(mesh2, mesh3)

        let geo = new THREE.OctahedronGeometry(0.09, 0)
        let mat = new THREE.MeshLambertMaterial({ color: "red" })
        let dia = new THREE.Mesh(geo, mat)
        dia.position.set(-0.9, 0.5, 0)
        const OctaAnchor = mindarThree.addAnchor(0)
        let dia2 = new THREE.Mesh(geo, mat)
        let dia3 = new THREE.Mesh(geo, mat)
        let dia4 = new THREE.Mesh(geo, mat)
        dia2.position.set(0.9, 0.5, 0)
        dia3.position.set(0.9, -0.5, 0)
        dia4.position.set(-0.9, -0.5, 0)
        OctaAnchor.group.add(dia, dia2, dia3, dia4)
        

        const mixer = new THREE.AnimationMixer(model.scene)
        const action = mixer.clipAction(model.animations[0])

        const hp = await handpose.load()

        const waveGesture = new fp.GestureDescription('wave')
        for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
            waveGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0)
            waveGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0)

        }

        const jumpGesture = new fp.GestureDescription('jump')
        jumpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0)
        for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
            jumpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
            jumpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
            
        }

        const GE = new fp.GestureEstimator([waveGesture, jumpGesture,])

        const audioClip = await loadAudio("./assets/Audios/Welcome.m4a")
        const audioClip1 = await loadAudio("./assets/Audios/Instruc.m4a")
        const audioClip2 = await loadAudio("./assets/Audios/what.m4a")
        const audioClip3 = await loadAudio("./assets/Audios/Elements.m4a")
        const audioClip4 = await loadAudio("./assets/Audios/AR.m4a")
        const audioClip5 = await loadAudio("./assets/Audios/VR.m4a")
        const audioClip6 = await loadAudio("./assets/Audios/Thank.m4a")



        const listener = new THREE.AudioListener()
        const audio = new THREE.Audio(listener)
        const audio1 = new THREE.Audio(listener)
        const audio2 = new THREE.Audio(listener)
        const audio3 = new THREE.Audio(listener)
        const audio4 = new THREE.Audio(listener)
        const audio5 = new THREE.Audio(listener)
        const audio6 = new THREE.Audio(listener)


        camera.add(listener)
        anchor.group.add(audio, audio1, audio2, audio3)
        audio.setBuffer(audioClip)
        audio1.setBuffer(audioClip1)
        audio2.setBuffer(audioClip2)
        audio3.setBuffer(audioClip3)
        audio4.setBuffer(audioClip4)
        audio5.setBuffer(audioClip5)
        audio6.setBuffer(audioClip6)



        obj3.element.onclick = function () {

            const t1 = new TimelineMax()
            t1.to(model.scene.position, 2, { x: -0.6 })
                .to(obj.rotation, 1, { x: Math.PI * 2 })
            mesh2.visible = false
            mesh3.visible = false
            obj4.visible = true
            obj.visible = true
            obj2.visible = false
            obj3.visible = false
            audio.stop()
            audio1.play(2)
            dia.visible = true
            dia2.visible = true

        };

        anchor.onTargetFound = () => {
            if (obj2.visible) {
                audio.play(2)

            }

            action.play()

        }

        anchor.onTargetLost = () => {

            audio.stop()
            audio1.stop()
            audio2.stop()
            audio3.stop()
            audio4.stop()
            audio5.stop()
            audio6.stop()
            action.stop()
        }


        const clock = new THREE.Clock()

        await mindarThree.start()

        renderer.setAnimationLoop(() => {
            if (obj2.visible) {
                mesh2.rotation.z += 0.06
                mesh3.rotation.z -= 0.06
            }

            dia.rotation.y += 0.07
            dia2.rotation.y -= 0.07
            dia3.rotation.y += 0.07
            dia4.rotation.y -= 0.07

            renderer.render(scene, camera)
            cssRenderer.render(cssScene, camera)
            const delta = clock.getDelta()
            mixer.update(delta)
        })
        const video = mindarThree.video
        let i = 0
        let skipCount = 0
        let j=0
        const detect = async () => {

            if (skipCount < 50) {
                skipCount += 1
                window.requestAnimationFrame(detect)
                return;
            }
            skipCount = 0
            

            const predictions = await hp.estimateHands(video)

            if (predictions.length > 0) {
                const estimatedGestures = GE.estimate(predictions[0].landmarks, 2)

                if (estimatedGestures.gestures.length > 0) {
                    const best = estimatedGestures.gestures[0]
                    console.log(best)
        
                    if (best.name === 'wave') {
                        if (audio.isPlaying || audio6.isPlaying || audio1.isPlaying || audio2.isPlaying || audio3.isPlaying|| audio4.isPlaying || audio5.isPlaying) {
                            audio.pause()
                            audio1.pause()
                            audio2.pause()
                            audio3.pause()
                            audio4.pause()
                            audio5.pause()
                            audio6.pause()

                        }
                        else {
                            if (obj.visible) {
                                audio1.play()
                            }

                            if (obj2.visible) {
                                audio.play()
                            }
                            if (obj5.visible) {
                                audio2.play()
                            }
                            if (obj7.visible) {
                                audio3.play()
                            }
                            if (obj9.visible) {
                                audio4.play()
                            }
                            if (obj11.visible) {
                                audio5.play()
                            }
                            if (obj13.visible) {
                                audio6.play()
                            }
                        }
                    }

                    else if (best.name === 'jump') {

                        if (i === 0 && obj.visible) {
                            audio2.play(3)
                            obj6.visible = true
                            obj5.visible = true
                            dia3.visible = true
                            dia4.visible = true
                            audio1.stop()
                            obj4.visible = false
                            obj.visible = false
                            const t2 = new TimelineMax()
                            t2.to(model.scene.position, 2, { x: 0.5 })
                                .to(obj5.rotation, 1, { x: Math.PI * 2 })
                            const t4 = new TimelineMax().repeat(20)
                            t4.to(dia.position, 2, { x: 0.9 })
                                .to(dia.position, 2, { y: -0.5 })
                                .to(dia.position, 2, { x: -0.9 })
                                .to(dia.position, 2, { y: 0.5 })

                            const t5 = new TimelineMax().repeat(20)
                            t5.to(dia2.position, 2, { y: -0.5 })
                                .to(dia2.position, 2, { x: -0.9 })
                                .to(dia2.position, 2, { y: 0.5 })
                                .to(dia2.position, 2, { x: 0.9 })

                            const t6 = new TimelineMax().repeat(20)
                            t6.to(dia3.position, 2, { x: -0.9 })
                                .to(dia3.position, 2, { y: 0.5 })
                                .to(dia3.position, 2, { x: 0.9 })
                                .to(dia3.position, 2, { y: -0.5 })

                            const t7 = new TimelineMax().repeat(20)
                            t7.to(dia4.position, 2, { y: 0.5 })
                                .to(dia4.position, 2, { x: 0.9 })
                                .to(dia4.position, 2, { y: -0.5 })
                                .to(dia4.position, 2, { x: -0.9 })


                            j=1

                        }
                        if (i === 1) {
                            audio2.stop()
                            audio3.play(3)
                            obj7.visible = true
                            obj8.visible = true
                            obj6.visible = false
                            obj5.visible = false
                            const t8 = new TimelineMax()
                            t8.to(model.scene.position, 2, { x: -0.6 })
                                .to(obj7.rotation, 1, { x: Math.PI * 2 })
                            j=2
                        }

                        if(i===2){
                            audio3.stop()
                            audio4.play(3)
                            obj9.visible =true
                            obj10.visible =true
                            obj7.visible = false
                            obj8.visible = false
                            const t9 = new TimelineMax()
                            t9.to(model.scene.position, 2, { x: 0.5 })
                                .to(obj7.rotation, 1, { x: Math.PI * 2 })
                                j=3
                        }
                        if(i===3){
                            audio4.stop()
                            audio5.play(3)
                            obj9.visible =false
                            obj10.visible =false
                            obj11.visible = true
                            obj12.visible=true
                            const t10 = new TimelineMax()
                            t10.to(model.scene.position, 2, { x: -0.6 })
                                .to(obj11.rotation, 1, { x: Math.PI * 2 })
                                j=4
                        }
                        if(i===4){
                            obj13.visible =true
                            audio5.stop()
                            audio6.play(3)
                            obj11.visible = false
                            obj12.visible=false
                            const t11 = new TimelineMax()
                            t11.to(model.scene.position, 1, { x: 0 })
                            
                        }

                        if(j>0){
                        i++
                        console.log(i)
                        }

                    }
                    
                }



                
            }
            
            window.requestAnimationFrame(detect)
        }


        window.requestAnimationFrame(detect)
    }
    start()

})