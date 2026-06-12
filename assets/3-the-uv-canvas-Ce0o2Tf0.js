import{u as e}from"./index-DGDYXfzW.js";import{d as t,f as n,i as r,l as i,o as a,p as o,r as s,s as c,u as l}from"./components-Do_4h20F.js";import{t as u}from"./hint-YU9uX7v1.js";import{t as d}from"./cashew-Bjb_stt8.js";var f=e(),p=`/assets/cashew-sample-DLeS7IKk.jpg`,m=`/assets/sample-right-DIgf_Yy5.png`,h=`/assets/region-outside-2-j_iq09St.png`,g=`/assets/repeat-modes-CDPuD-ef.png`,_=`/assets/repeat-enabled-vhwV4DXM.png`,v=`/assets/mirror-enabled-IXqz_Q8q.png`,y=`/assets/canvas-move-CPhtOcAj.mp4`,b=`/assets/csp-canvas-shift-pOWzEmJp.jpg`,x=`/assets/canvas-resize-BEVOnk9r.mp4`,S=`/assets/csp-canvas-resize-CKbofOVf.jpg`,C=`/assets/crumple-CWEzYQvK.mp4`;function w(e){let w={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,figure:`figure`,h1:`h1`,h4:`h4`,h5:`h5`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(w.h1,{id:`the-uv-canvas`,children:(0,f.jsx)(w.a,{href:`#the-uv-canvas`,children:`The UV Canvas`})}),`
`,(0,f.jsx)(w.p,{children:`Welcome back! How was your dance with the GPU?`}),`
`,(0,f.jsx)(w.p,{children:`Last time, we had quite the journey, but we ended up building a portal to Shader World.
That is no small feat! It would probably take me over a minute to enumerate all of it.`}),`
`,(0,f.jsx)(w.p,{children:`Actually, why not, I'll set a timer and write as fast as I can. Here's a list of your achievements:`}),`
`,(0,f.jsx)(s,{children:(0,f.jsxs)(w.ul,{children:[`
`,(0,f.jsx)(w.li,{children:`Survived your first encounter with a shader`}),`
`,(0,f.jsx)(w.li,{children:`Know the difference between a vertex and a fragment shader`}),`
`,(0,f.jsx)(w.li,{children:`Know almost all data types used in shaders`}),`
`,(0,f.jsx)(w.li,{children:`Created an especially cute empty square`}),`
`,(0,f.jsx)(w.li,{children:`Understood that a shader is written for a singular element, not the whole canvas`}),`
`,(0,f.jsx)(w.li,{children:`Made the square blue`}),`
`,(0,f.jsx)(w.li,{children:`Debugged by visualizing the UV coordinates`}),`
`,(0,f.jsx)(w.li,{children:`Customized shaders with uniforms`}),`
`,(0,f.jsx)(w.li,{children:`Made a textfield happy 🙂`}),`
`,(0,f.jsx)(w.li,{children:`Were the star of the night by dancing with the GPU`}),`
`,(0,f.jsxs)(w.li,{children:[`Used sharp intuition, not math, to figure out the dance steps`,`
`,(0,f.jsxs)(w.ul,{children:[`
`,(0,f.jsx)(w.li,{children:`distance`}),`
`,(0,f.jsx)(w.li,{children:`smoothstep`}),`
`,(0,f.jsx)(w.li,{children:`mix`}),`
`,(0,f.jsx)(w.li,{children:`masking`}),`
`,(0,f.jsx)(w.li,{children:`animating with sin and TIME`}),`
`,(0,f.jsx)(w.li,{children:`drawing complex shapes`}),`
`]}),`
`]}),`
`,(0,f.jsx)(w.li,{children:`Assembled all of the above into a portal. A real one. With a rim and everything.`}),`
`,(0,f.jsx)(w.li,{children:`Read the whole achievement list`}),`
`]})}),`
`,(0,f.jsxs)(w.p,{children:[`Okay, that took longer than I had thought.. `,(0,f.jsx)(u,{message:`In my defense, my shift key was acting up because I dropped some coffee on my laptop yesterday.`,children:`1:52 minutes.`}),`
That's a lot of ground covered by someone who just touched a shader for the first time.
Take a second to look at that.
You earned every single one of those stars!`]}),`
`,(0,f.jsx)(w.p,{children:`Hopefully, you took some time to experiment after the last post.
If you didn't... well, I am technically just a voice in your head reading text on the screen, so I'll wait for as long as you need!
Click the button when you're done!`}),`
`,(0,f.jsxs)(i,{label:`I'm ready!`,children:[(0,f.jsxs)(l,{align:`center`,children:[` `,(0,f.jsx)(`h5`,{children:`No rickrolls... this time`})]}),(0,f.jsxs)(w.p,{children:[`Alright, but up until now, all our shaders could do was sit there and be pretty 🎀.`,(0,f.jsx)(`br`,{}),`
But let's be real, if you wanted to look at something pretty, you'd just check a mirror.`]}),(0,f.jsx)(w.p,{children:`To make a shader truly interesting, though, we need to add one more ingredient.`}),(0,f.jsx)(w.h4,{id:`movement`,children:(0,f.jsx)(w.a,{href:`#movement`,children:`Movement`})}),(0,f.jsx)(t,{}),(0,f.jsx)(w.p,{children:`Let's create a moving shader! Meet Cashew, my assistant!`}),(0,f.jsx)(n,{width:200,label:`Cashew`,children:(0,f.jsx)(`img`,{src:d,alt:`Cashew OldDew`})}),(0,f.jsx)(w.p,{children:`Right now, Cashew is just an image. A flat grid of colored pixels, unable to show his unending excitement.
To bring him into Shader World, our fragment shader needs to answer the same question it always does:`}),(0,f.jsx)(w.p,{children:`"What color should the current pixel be?"`}),(0,f.jsx)(w.p,{children:`Except this time, instead of calculating the answer ourselves... we make sure no one's looking and copy it from the texture.`}),(0,f.jsxs)(w.p,{children:[`That's `,(0,f.jsx)(u,{message:`The next time you get caught, just tell the teacher you were texture sampling. Works every time!`,children:(0,f.jsx)(w.strong,{children:`texture sampling`})}),`!`]}),(0,f.jsxs)(w.p,{children:[`To do that we use a shader built-in function, unsurprisingly called `,(0,f.jsx)(w.code,{children:`texture()`}),`.
With it, each fragment uses its `,(0,f.jsx)(w.em,{children:`UV`}),` coordinates to find the corresponding point in the image.`]}),(0,f.jsxs)(w.p,{children:[`For example, a fragment at (0.2, 0.3) looks 20% across and 30% down the texture and picks the color it `,(0,f.jsx)(u,{message:`Sometimes, that percentage might not perfectly align with a pixel's coordinate. In such cases, Godot relies on the object's filter mode to 'guess' the color of the pixel. This leads to the canon event we all went through where pixel art looks blurry, which happens with the 'linear' filter mode, because we're mixing large sprites with small textures!`,children:`landed on`}),`.`]}),(0,f.jsx)(n,{width:360,label:`Pixel Sampled from Cashew`,children:(0,f.jsx)(`img`,{src:p,alt:`Pixel Sampled from Cashew`})}),(0,f.jsx)(w.p,{children:`And again, remember that the UVs are just percentages.
The scale of either the object or the texture does not matter in this case.
A UV value of 0.2 will always sample a value 20% inside the texture.`}),(0,f.jsx)(w.p,{children:(0,f.jsx)(w.em,{children:`"But wait, how does the shader even know we want to sample Cashew?"`})}),(0,f.jsxs)(w.p,{children:[`Most nodes you'd likely apply shaders on will have a texture property. Godot gives us that property through the `,(0,f.jsx)(w.code,{children:`TEXTURE`}),` built-in. How convenient!`]}),(0,f.jsx)(w.p,{children:`So now, putting it all together, my dear assistant is going to...`}),(0,f.jsx)(u,{message:`There was supposed to be a magic wand here, but it doesn't work on all systems. Cashew appeared, but the wand is gone. The universe gives, the universe takes.`,children:`Appear in Shader World!`}),(0,f.jsx)(c,{sprite:d,fullShader:`shader_type canvas_item;

void fragment() {
  COLOR = texture(TEXTURE, UV);
}`,width:200,showCode:!0}),(0,f.jsx)(w.p,{children:`We just wrote the shader Godot is applying by default to all 2D nodes using textures.`}),(0,f.jsx)(w.p,{children:`This is great progress, but Cashew still isn't moving. How could we solve this?`}),(0,f.jsxs)(w.p,{children:[`Well, we can't tell a pixel to move, a pixel is a pixel, it's just a small light glowing with color.
What we `,(0,f.jsx)(w.em,{children:`can`}),` do is to tell the pixel to sample a different color, one that comes from somewhere else in the texture.`]}),(0,f.jsxs)(w.p,{children:[`For example, let's see what happens if we tell our pixels to sample with a `,(0,f.jsx)(w.code,{children:`0.5`}),` offset to the right:`]}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  // We can access parts of a vec with
  // either (x,y,z,w) or (r,g,b,a)
  // we already did this for colors
  vec2 new_uv = vec2(UV.x + 0.5, UV.y);

  COLOR = texture(TEXTURE, new_uv);
}`,width:200,showCode:!0}),(0,f.jsxs)(w.p,{children:[`No, your screen is not broken. This is actually what we expect to see, but there are `,(0,f.jsx)(u,{message:`Okay, more like two questions, but they're big questions!`,children:`so.. many.. questions`}),`!`]}),(0,f.jsxs)(w.p,{children:[`First of all, didn't we say we're going to have an offset to the `,(0,f.jsx)(w.em,{children:`right`}),`? We literally added `,(0,f.jsx)(w.code,{children:`0.5`}),` to our coordinates. Why did the image move left?`]}),(0,f.jsxs)(w.p,{children:[`Let's take an example:
The top-left corner has the UV coordinates `,(0,f.jsx)(w.code,{children:`(0.0, 0.0)`}),`, so by adding the horizontal offset, it samples the color at `,(0,f.jsx)(w.code,{children:`(0.5, 0.0)`}),`, which is the highest point at the middle of our texture.
If we apply the same rule for each pixel, we end up with a sampling that looks something like this:`]}),(0,f.jsx)(n,{label:`Texture sampling with a 0.5 horizontal offset`,width:360,children:(0,f.jsx)(`img`,{src:m,alt:`Texture sampling with a 0.5 horizontal offset`})}),(0,f.jsx)(w.p,{children:`Okay, but that still doesn't explain the weird glitch effect that's happening to the other half.`}),(0,f.jsxs)(w.p,{children:[`Let's take another example:
The pixel at the top-right corner has the coordinates `,(0,f.jsx)(w.code,{children:`(1.0, 0.0)`}),`. This time, the horizontal offset takes us to `,(0,f.jsx)(w.code,{children:`(1.5, 0.0)`}),`, which lands outside the `,(0,f.jsx)(u,{message:`Remember! We get the texture pixels, or texels, for short, only with UV values ranging between (0.0, 0.0) and (1.0, 1.0).`,children:`texture's bounds`}),`.
Similarly, all pixels with the x coordinate larger than 0.5 land in this same region. So, what happens when a shader tries to sample outside of a texture?`]}),(0,f.jsx)(n,{label:`The sampled region outside the texture`,width:360,children:(0,f.jsx)(`img`,{src:h,alt:`The sampled region outside the texture`})}),(0,f.jsxs)(w.p,{children:[`Well, it depends. Similarly to how there's a filter mode property for every `,(0,f.jsx)(u,{message:`Found in Inspector > CanvasItem > Texture.`,children:`texture`}),`, there's also a repeat mode property which tells the shader how to behave when sampling values `,(0,f.jsx)(w.em,{children:`outside`}),` the texture's range.`]}),(0,f.jsx)(n,{label:`Filter and Repeat mode texture settings`,children:(0,f.jsx)(`img`,{src:g,alt:`Filter and Repeat mode texture settings`})}),(0,f.jsxs)(w.p,{children:[`By default, the texture doesn't repeat. Because of that, Godot effectively clamps the coordinates to the edge of the texture.
So, for our example, when our coordinates became `,(0,f.jsx)(w.code,{children:`(1.5, 0.0)`}),`, the shader treated them as (`,(0,f.jsx)(w.code,{children:`1.0, 0.0)`}),`. Applying that to all other pixels in this region leads to the striped glitchy image we see.`]}),(0,f.jsx)(w.p,{children:`The other repeat modes do pretty much what you'd expect:`}),(0,f.jsxs)(o,{align:`center`,children:[(0,f.jsx)(n,{label:`Repeat Mode: Enabled`,width:260,children:(0,f.jsx)(`img`,{src:_,alt:`Repeat Mode: Enabled`})}),(0,f.jsx)(n,{label:`Repeat Mode: Mirror`,width:260,children:(0,f.jsx)(`img`,{src:v,alt:`Repeat Mode: Mirror`})})]}),(0,f.jsxs)(w.p,{children:[`But getting back to our non-repeating texture, we can easily get rid of the weird lines by discarding pixels with coordinates that would sample outside the texture.
And yes, this follows the same obvious naming pattern, as we just have to write `,(0,f.jsx)(w.code,{children:`discard`}),`.`]}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  vec2 new_uv = vec2(UV.x + 0.5, UV.y);

  COLOR = texture(TEXTURE, new_uv);

  // I won't add this code block 
  // in future examples for brevity
  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:200,showCode:!0}),(0,f.jsx)(w.p,{children:`Finally, movement can't really be called "movement" if we just teleport Cashew to a different position.
To properly see it in action, let's add a vec2 uniform for our offset.`}),(0,f.jsx)(c,{sprite:d,fullShader:`uniform vec2 offset = vec2(0.0);

void fragment() {
  vec2 new_uv = vec2(UV.x + offset.x, UV.y + offset.y);

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:200,showCode:!0,controls:{offset:{label:`Offset`,type:`vec2`,min:-1,max:1,defaultVec:[0,0]}},children:`uniform vec2 offset = vec2(0.0);

void fragment() {
  vec2 new_uv = vec2(UV.x + offset.x, UV.y + offset.y);

  COLOR = texture(TEXTURE, new_uv);
  
  // ... discarding logic
}`}),(0,f.jsxs)(w.p,{children:[`Now, I don't know about you, but despite seeing a result and understanding `,(0,f.jsx)(w.em,{children:`why`}),` we reach that result, I'm not very satisfied.`]}),(0,f.jsxs)(w.blockquote,{children:[`
`,(0,f.jsx)(w.p,{children:`I mean, sure, I get it. I take a pixel, add a value, calculate the new coordinate, and if I do that enough times, I can eventually guess what the result looks like.`}),`
`]}),(0,f.jsx)(w.p,{children:`That way of thinking is precise, yes, but it is not very human.
If an image editing tutorial told you to zoom in, apply an effect on a single pixel, and predict how the final image looks... you'd rightfully scroll to the comment section to write something mean.`}),(0,f.jsx)(w.p,{children:`So let's think more like humans and appreciate what happens in the big picture. Let's see why...`}),(0,f.jsx)(w.h4,{id:`uv-is-our-canvas`,children:(0,f.jsx)(w.a,{href:`#uv-is-our-canvas`,children:`UV is our Canvas`})}),(0,f.jsx)(t,{}),(0,f.jsx)(w.p,{children:`Moving away from shaders for a minute, let's say you wanted to draw something.
Minutes or hours later, your masterpiece has grown far beyond what you originally planned, and you're running out of canvas space.
If you're doing digital art, you're in luck! Most art programs allow you to resize, move or even rotate your canvas.`}),(0,f.jsxs)(w.p,{children:[`Look, for example, at how the canvas can be moved in `,(0,f.jsx)(u,{message:`Throughout this series I'll occasionally use different image editing programs when they make for a good example. These mentions are purely for illustration purposes and shouldn't be taken as recommendations. Feel free to mentally replace them with whichever editor you prefer.`,children:`Clip Studio Paint`}),`:`]}),(0,f.jsx)(n,{width:420,label:`Canvas Size Tool in CSP`,children:(0,f.jsx)(`video`,{src:y,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,type:`video/mp4`})}),(0,f.jsx)(w.p,{children:`After applying the change, the result is surprisingly similar to what we saw when we added 0.5 to the shader UVs.`}),(0,f.jsx)(n,{label:`Cashew Image with Canvas Offset`,width:260,children:(0,f.jsx)(`img`,{src:b,alt:`Cashew Image with Canvas Offset`})}),(0,f.jsx)(w.p,{children:`This is no coincidence! Let's try it the other way around. Let's make the canvas twice as large in our image editor, and then to do the same in our shader:`}),(0,f.jsx)(n,{width:420,label:`Canvas Size Tool in CSP`,children:(0,f.jsx)(`video`,{src:x,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,type:`video/mp4`})}),(0,f.jsx)(w.p,{children:`Cashew looks smaller now! Please take note of the fact that this doesn't confuse you at all and you totally expected this result:`}),(0,f.jsx)(n,{label:`Cashew Image with Canvas Scaling`,width:260,children:(0,f.jsx)(`img`,{src:S,alt:`Cashew Image with Canvas Scaling`})}),(0,f.jsxs)(w.p,{children:[`Now look at the result of this shader which multiplies the UV by `,(0,f.jsx)(w.code,{children:`2.0`}),`:`]}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  vec2 new_uv = UV * 2.0;

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,children:`void fragment() {
  vec2 new_uv = UV * 2.0;

  COLOR = texture(TEXTURE, new_uv);
  
  // ... discarding logic
}`}),(0,f.jsx)(l,{align:`center`,children:(0,f.jsx)(`h4`,{children:`The result is exactly the same!`})}),(0,f.jsx)(w.p,{children:`This time, however, because we looked at UVs from a different lens it was so much easier to understand why changing it behaves the way it does.`}),(0,f.jsxs)(w.p,{children:[`It's true that UVs are the coordinates of a fragment, and yes, if we apply some change and calculate it, the math checks out, but you can generally verify with math only after you've come to a solution.
When building shaders, you don't have the solution ahead of time. So instead, what we need to know is:`,(0,f.jsx)(`br`,{}),`What does changing these UVs `,(0,f.jsx)(w.strong,{children:`mean`}),` for the overall shader?`]}),(0,f.jsxs)(w.p,{children:[`Changing the UVs is like changing the `,(0,f.jsx)(w.em,{children:`canvas`}),` of your shader artwork.`]}),(0,f.jsx)(w.p,{children:`UVs are your canvas!`}),(0,f.jsx)(w.h4,{id:`but-theres-more`,children:(0,f.jsx)(w.a,{href:`#but-theres-more`,children:`But there's more!`})}),(0,f.jsx)(t,{}),(0,f.jsx)(w.p,{children:`Unlike the canvas in an image editor, ours isn't limited to being moved around or resized.`}),(0,f.jsx)(w.p,{children:`We can flip it, spin it, tile it, bend it, twist it, pull it, bop it!`}),(0,f.jsxs)(w.p,{children:[`We've already seen `,(0,f.jsx)(w.strong,{children:`translation`}),` and `,(0,f.jsx)(w.strong,{children:`scaling`}),`. Actually, here's a shader for you to play around with them together:`]}),(0,f.jsx)(c,{sprite:d,fullShader:`uniform vec2 offset = vec2(0.0);
uniform vec2 scale = vec2(1.0);

void fragment() {
  vec2 new_uv = vec2(UV.x + offset.x, UV.y + offset.y);
  new_uv *= scale;

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:200,showCode:!0,controls:{offset:{label:`Offset`,type:`vec2`,min:-1,max:1,defaultVec:[0,0]},scale:{label:`Scale`,type:`vec2`,min:-2,max:2,defaultVec:[1,1]}},children:`uniform vec2 offset = vec2(0.0);
uniform vec2 scale = vec2(1.0);

void fragment() {
  vec2 new_uv = vec2(UV.x + offset.x, UV.y + offset.y);
  new_uv *= scale;

  COLOR = texture(TEXTURE, new_uv);
  
  // ... discarding logic
}`}),(0,f.jsxs)(w.p,{children:[`But let's take a look at `,(0,f.jsx)(u,{message:`Don't worry about memorizing them. In future lessons we'll look at these in more detail to fully understand them. What's cool, though, is that you don't need to always fully understand how a tool works in order to use it. Until we learn more, if you wanted to improve your shaders with any of these effects, you could just copy them!`,children:`some of the other things`}),` our canvas can do.`]}),(0,f.jsx)(w.h5,{id:`1-flip`,children:(0,f.jsx)(w.a,{href:`#1-flip`,children:`1. Flip`})}),(0,f.jsx)(w.p,{children:`If we take either of the UV coordinates and subtract it from 1.0, it reverses that direction.
That's it. Canvas flipped.`}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  vec2 new_uv = vec2(1.0 - UV.x, UV.y);

  COLOR = texture(TEXTURE, new_uv);
}`,width:260,showCode:!0,children:`void fragment() {
  vec2 new_uv = vec2(1.0 - UV.x, UV.y);

  COLOR = texture(TEXTURE, new_uv);
}`}),(0,f.jsx)(w.h5,{id:`2-repeat`,children:(0,f.jsx)(w.a,{href:`#2-repeat`,children:`2. Repeat`})}),(0,f.jsx)(w.p,{children:`Who ordered 9 canvases? I'm not paying for that!`}),(0,f.jsxs)(w.p,{children:[`You know how our texture gets sampled when coordinates land between `,(0,f.jsx)(w.em,{children:`0.0`}),` and `,(0,f.jsx)(w.em,{children:`1.0`}),`?
Well, who's to say you can't land there multiple times? What if every time we reached the edge of our interval, we started from the beginning?`]}),(0,f.jsxs)(w.p,{children:[`That's exactly what the `,(0,f.jsx)(w.code,{children:`fract()`}),` function does. It keeps only the decimal part of the number, so values like `,(0,f.jsx)(w.em,{children:`0.5`}),`, `,(0,f.jsx)(w.em,{children:`1.5`}),` and `,(0,f.jsx)(w.em,{children:`2.5`}),`, all become `,(0,f.jsx)(w.em,{children:`0.5`}),`.`]}),(0,f.jsxs)(w.p,{children:[`In the next example, scaling the UVs by `,(0,f.jsx)(w.code,{children:`3.0`}),` and wrapping with `,(0,f.jsx)(w.code,{children:`fract()`}),` tiles the canvas into a 3x3 grid of repeating copies.`]}),(0,f.jsx)(c,{sprite:d,fullShader:`uniform vec2 repeat = vec2(3.0);

void fragment() {
  vec2 new_uv = fract(UV * repeat);

  COLOR = texture(TEXTURE, new_uv);
}`,width:260,showCode:!0,controls:{repeat:{label:`Repeat`,type:`vec2`,min:0,max:10,defaultVec:[3,3]}},children:`uniform vec2 repeat = vec2(3.0);

void fragment() {
  vec2 new_uv = fract(UV * repeat);

  COLOR = texture(TEXTURE, new_uv);
}`}),(0,f.jsx)(w.h5,{id:`3-skew`,children:(0,f.jsx)(w.a,{href:`#3-skew`,children:`3. Skew`})}),(0,f.jsx)(w.p,{children:`If we give each axis a little push based on how far along the other axis the current fragment is, we get a slant or a skew effect.`}),(0,f.jsx)(c,{sprite:d,fullShader:`uniform vec2 skew = vec2(0.0);

void fragment() {
  vec2 new_uv = vec2(
      UV.x + UV.y * skew.x,
      UV.y + UV.x * skew.y
  );

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,controls:{skew:{label:`Skew`,type:`vec2`,min:-1,max:1,defaultVec:[.5,0]}},children:`uniform vec2 skew = vec2(0.0);

void fragment() {
  vec2 new_uv = vec2(
      UV.x + UV.y * skew.x,
      UV.y + UV.x * skew.y
  );

  COLOR = texture(TEXTURE, new_uv);

  // ... discarding logic
}`}),(0,f.jsx)(w.h5,{id:`4-distort`,children:(0,f.jsx)(w.a,{href:`#4-distort`,children:`4. Distort`})}),(0,f.jsxs)(w.p,{children:[`However, nobody's telling us to push by the same amount or in the same direction. Let's exercise some free will by giving each pixel its own nudge in a `,(0,f.jsx)(u,{message:`Any repeating pattern reasonably sitting between the [0.0, 1.0] interval would work. Here I picked a sine and a cosine because together they make for a nice wavy effect, but you can pick anything. Also, we'll see soon, in a future chapter, how to pick the proper numbers.`,children:`different pattern`}),`.`]}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  vec2 new_uv = vec2(
      // Notice how only what's after "UV.x +"
      // changed from the previous example
      UV.x + sin(UV.y * 20.0) * 0.03,
      UV.y + cos(UV.x * 20.0) * 0.03
  );

  COLOR = texture(TEXTURE, new_uv);
}`,width:260,showCode:!0,children:`void fragment() {
  vec2 new_uv = vec2(
      // Notice how only what's after "UV.x +"
      // changed from the previous example
      UV.x + sin(UV.y * 20.0) * 0.03,
      UV.y + cos(UV.x * 20.0) * 0.03
  );

  COLOR = texture(TEXTURE, new_uv);
}`}),(0,f.jsxs)(w.p,{children:[`Add `,(0,f.jsx)(w.code,{children:`TIME`}),` and suddenly Cashew is `,(0,f.jsx)(u,{message:`I also had to tweak some numbers, otherwise he would've looked like he was submerged in a blender`,children:`submerged underwater`}),`.`]}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  vec2 new_uv = vec2(
      UV.x + sin(UV.y * 10.0 + TIME) * 0.01,
      UV.y + cos(UV.x * 10.0 + TIME) * 0.01
  );

  COLOR = texture(TEXTURE, new_uv);
}`,width:260,showCode:!0,children:`void fragment() {
  vec2 new_uv = vec2(
      UV.x + sin(UV.y * 10.0 + TIME) * 0.01,
      UV.y + cos(UV.x * 10.0 + TIME) * 0.01
  );

  COLOR = texture(TEXTURE, new_uv);
}`}),(0,f.jsxs)(w.blockquote,{children:[`
`,(0,f.jsx)(w.p,{children:`What I especially love about these kind of distortions is that they give us the power to treat our canvas like paper we could crumple`}),`
`]}),(0,f.jsx)(n,{width:420,label:`Crumpled paper is just a random distortion`,children:(0,f.jsx)(`video`,{src:C,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,type:`video/mp4`})}),(0,f.jsx)(w.h5,{id:`5-rotate`,children:(0,f.jsx)(w.a,{href:`#5-rotate`,children:`5. Rotate`})}),(0,f.jsxs)(w.p,{children:[`When rotating, every point in the image traces its own circular path.
What the `,(0,f.jsx)(u,{message:`We'll see later how to intuitively find it.`,children:`formula`}),` does is to get the x and y coordinates that land on that circle of rotation.
For now we don't need to worry about `,(0,f.jsx)(w.em,{children:`how it works`}),`. All that matters is that we have something like:`]}),(0,f.jsx)(w.figure,{"data-rehype-pretty-code-figure":``,children:(0,f.jsx)(w.pre,{style:{"--shiki-light":`#5c6a72`,"--shiki-dark":`#EEFFFF`,"--shiki-light-bg":`#fdf6e3`,"--shiki-dark-bg":`#212121`},tabIndex:`0`,"data-language":`glsl`,"data-theme":`everforest-light material-theme-darker`,children:(0,f.jsx)(w.code,{"data-language":`glsl`,"data-theme":`everforest-light material-theme-darker`,style:{display:`grid`},children:(0,f.jsxs)(w.span,{"data-line":``,children:[(0,f.jsx)(w.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:`vec2`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` new_uv `}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`=`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:` vec2`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`some_circle_coordinate.x`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`,`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` some_circle_coordinate.y`}),(0,f.jsx)(w.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`);`})]})})})}),(0,f.jsx)(w.p,{children:`Let's make the angle of rotation vary with TIME as well, so that our movement dedicated chapter has at least three shaders actually moving.`}),(0,f.jsx)(c,{sprite:d,fullShader:`void fragment() {
  float angle = TIME;
  vec2 new_uv = vec2(
      UV.x * cos(angle) - UV.y * sin(angle),
      UV.x * sin(angle) + UV.y * cos(angle)
  );

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,children:`void fragment() {
  float angle = TIME;
  vec2 new_uv = vec2(
      UV.x * cos(angle) - UV.y * sin(angle),
      UV.x * sin(angle) + UV.y * cos(angle)
  );

  COLOR = texture(TEXTURE, new_uv);

  // ... discarding logic
}`}),(0,f.jsxs)(w.p,{children:[`No need to worry, the shader is not broken. We just have to wait for Cashew to spin around the `,(0,f.jsx)(w.code,{children:`(0.0, 0.0)`}),` coordinate.`]}),(0,f.jsxs)(w.p,{children:[`You probably expected the rotation to happen from the center of the canvas, around `,(0,f.jsx)(w.code,{children:`(0.5, 0.5)`}),`, and of course, with some hard work, we could find a formula that gives us that.
If my plan was to make you leave the course as fast as possible, that would've been an effective strategy.`]}),(0,f.jsxs)(w.p,{children:[`It's true that there's some math in our shaders, but we can at least keep it clean and pretty.
We'll see that the more our parameters are `,(0,f.jsx)(u,{message:`I mean this quite literally! If a parameter is 0, it doesn't exist!`,children:`zeroes and ones`}),`, the easier it becomes to wrap our heads around what's going on in an example.
That's why I like keeping the center `,(0,f.jsx)(w.code,{children:`(0.0, 0.0)`}),` in this case.`]}),(0,f.jsxs)(w.p,{children:[`But how, then, can we rotate around the center of our canvas? How do we choose a `,(0,f.jsx)(w.em,{children:`pivot`}),` around which we can apply the transformations we learned?`]}),(0,f.jsx)(w.p,{children:`In the next post we're going to learn, not how to change a formula to fit our canvas, but how to change our canvas to fit a simpler formula.`}),(0,f.jsxs)(w.p,{children:[`Until then, the most important thing you can do is keep experimenting. Take what you've learned today and make some textures feel alive by adding movement to them!
I'd love to see you join the `,(0,f.jsx)(w.a,{href:`https://discord.gg/3jkTF9FgWJ`,children:`Discord Server`}),` and share them with me and the community.`]}),(0,f.jsx)(w.p,{children:`Thank you so much for reading! Until next time, happy shading!`}),(0,f.jsx)(t,{}),(0,f.jsxs)(w.p,{children:[`Writing this course, building shaders and interactive previews for them is really fun, but requires a large chunk of time and an even larger amount of peanuts. 🥜`,(0,f.jsx)(`br`,{}),`
Fun cannot buy peanuts, but YOU CAN!`]}),(0,f.jsxs)(w.p,{children:[`If you genuinely feel like this guide helped you and you want it to continue, consider supporting my work!`,(0,f.jsx)(`br`,{}),`
This series will stay entirely free, independent and clear of ads, but its completion and development speed will be greatly influenced by your help!`]}),(0,f.jsxs)(w.p,{children:[`You can find all the ways to keep the portal alive down below.`,(0,f.jsx)(`br`,{}),`
Thank you so much!`]}),(0,f.jsx)(a,{})]}),`
`,(0,f.jsx)(r,{postId:`shaders-3`})]})}function T(e={}){let{wrapper:t}=e.components||{};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(w,{...e})}):w(e)}export{T as default};