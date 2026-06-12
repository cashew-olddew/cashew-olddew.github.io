import{u as e}from"./index-DGDYXfzW.js";import{c as t,d as n,f as r,i,n as a,o,s,t as c,u as l}from"./components-Do_4h20F.js";import{t as u}from"./hint-YU9uX7v1.js";import{t as d}from"./cashew-Bjb_stt8.js";var f=e(),p=`/assets/rotate-top-left-C_9iXo8o.mp4`,m=`/assets/rotate-center-C5aefoBw.mp4`,h=`/assets/cropped-rotate-center-6KusBBHV.mp4`,g=`/assets/cashew-heart-7yzlLAul.jpg`;function _(e){let _={a:`a`,b:`b`,blockquote:`blockquote`,code:`code`,del:`del`,em:`em`,figure:`figure`,h1:`h1`,h4:`h4`,i:`i`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(_.h1,{id:`the-pivot`,children:(0,f.jsx)(_.a,{href:`#the-pivot`,children:`The Pivot`})}),`
`,(0,f.jsx)(_.p,{children:`The last guide left us on a bit of a cliffhanger. In the rotation shader Cashew quite literally looked like he was hanging off a cliff. Someone needs to be held accountable for this!`}),`
`,(0,f.jsx)(l,{align:`center`,children:(0,f.jsx)(_.strong,{children:`Let's investigate!🔍`})}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsx)(_.p,{children:`First of all, here's how Cashew got into this situation:`}),`
`,(0,f.jsx)(s,{sprite:d,fullShader:`void fragment() {
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
}`}),`
`,(0,f.jsx)(_.p,{children:`Most of the time we can't even see Cashew, since he's spinning around the top-left corner.
But who would do such a thing?`}),`
`,(0,f.jsxs)(_.p,{children:[`We don't have to do much detective work to figure out the culprit.
Our `,(0,f.jsx)(u,{message:`After all, that's the only thing our shader does!`,children:`main suspect`}),` is `,(0,f.jsx)(_.em,{children:`the rotation function`}),`!`]}),`
`,(0,f.jsx)(_.figure,{"data-rehype-pretty-code-figure":``,children:(0,f.jsx)(_.pre,{style:{"--shiki-light":`#5c6a72`,"--shiki-dark":`#EEFFFF`,"--shiki-light-bg":`#fdf6e3`,"--shiki-dark-bg":`#212121`},tabIndex:`0`,"data-language":`glsl`,"data-theme":`everforest-light material-theme-darker`,children:(0,f.jsxs)(_.code,{"data-language":`glsl`,"data-theme":`everforest-light material-theme-darker`,style:{display:`grid`},children:[(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:`vec2`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` new_uv `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`=`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:` vec2`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`})]}),`
`,(0,f.jsx)(_.span,{"data-line":``,children:(0,f.jsx)(_.span,{style:{"--shiki-light":`#939F91`,"--shiki-light-font-style":`italic`,"--shiki-dark":`#545454`,"--shiki-dark-font-style":`italic`},children:`    //🏃‍♀️💨 You'll never catch me alive! `})}),`
`,(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`    UV.x `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`*`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` cos`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`)`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` -`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` UV.y `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`*`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` sin`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`),`})]}),`
`,(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`    UV.x `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`*`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` sin`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`)`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` +`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` UV.y `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`*`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` cos`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`)`})]}),`
`,(0,f.jsx)(_.span,{"data-line":``,children:(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`);`})})]})})}),`
`,(0,f.jsx)(_.p,{children:`Everyone leaves a trace, and in our case, the top-left corner is awfully suspicious!
I think it's time for some questioning.`}),`
`,(0,f.jsx)(_.h4,{id:`why-is-the-top-left-corner-not-moving`,children:(0,f.jsx)(_.a,{href:`#why-is-the-top-left-corner-not-moving`,children:`Why is the top-left corner not moving?`})}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsxs)(_.p,{children:[`At that point our UVs have the value `,(0,f.jsx)(_.code,{children:`(0, 0)`}),`.
There's nothing inherently special about these coordinates, but for our function, something interesting happens if we replace the UVs with them:`]}),`
`,(0,f.jsx)(_.figure,{"data-rehype-pretty-code-figure":``,children:(0,f.jsx)(_.pre,{style:{"--shiki-light":`#5c6a72`,"--shiki-dark":`#EEFFFF`,"--shiki-light-bg":`#fdf6e3`,"--shiki-dark-bg":`#212121`},tabIndex:`0`,"data-language":`glsl`,"data-theme":`everforest-light material-theme-darker`,children:(0,f.jsxs)(_.code,{"data-language":`glsl`,"data-theme":`everforest-light material-theme-darker`,style:{display:`grid`},children:[(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:`vec2`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` new_uv `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`=`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:` vec2`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`})]}),`
`,(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#DF69BA`,"--shiki-dark":`#F78C6C`},children:`    0.0`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` *`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` cos`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`)`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` -`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#DF69BA`,"--shiki-dark":`#F78C6C`},children:` 0.0`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` *`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` sin`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`),`})]}),`
`,(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#DF69BA`,"--shiki-dark":`#F78C6C`},children:`    0.0`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` *`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` sin`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`)`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` +`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#DF69BA`,"--shiki-dark":`#F78C6C`},children:` 0.0`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:` *`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#8DA101`,"--shiki-dark":`#82AAFF`},children:` cos`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:`angle`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`)`})]}),`
`,(0,f.jsx)(_.span,{"data-line":``,children:(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`);`})}),`
`,(0,f.jsx)(_.span,{"data-line":``,children:` `}),`
`,(0,f.jsx)(_.span,{"data-line":``,children:(0,f.jsx)(_.span,{style:{"--shiki-light":`#939F91`,"--shiki-light-font-style":`italic`,"--shiki-dark":`#545454`,"--shiki-dark-font-style":`italic`},children:`// Let's see what's behind the point's mask:`})}),`
`,(0,f.jsx)(_.span,{"data-line":``,children:` `}),`
`,(0,f.jsxs)(_.span,{"data-line":``,children:[(0,f.jsx)(_.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:`vec2`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#EEFFFF`},children:` new_uv `}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#F57D26`,"--shiki-dark":`#89DDFF`},children:`=`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#3A94C5`,"--shiki-dark":`#C792EA`},children:` vec2`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`(`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#DF69BA`,"--shiki-dark":`#F78C6C`},children:`0.0`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`,`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#DF69BA`,"--shiki-dark":`#F78C6C`},children:` 0.0`}),(0,f.jsx)(_.span,{style:{"--shiki-light":`#5C6A72`,"--shiki-dark":`#89DDFF`},children:`);`})]})]})})}),`
`,(0,f.jsxs)(_.p,{children:[`From whatever `,(0,f.jsx)(u,{message:`Pun, very much, intended!`,children:`angle`}),` you look at it, in the corner, the new UVs remain the same as the initial UVs: `,(0,f.jsx)(_.code,{children:`(0.0, 0.0)`}),`.`]}),`
`,(0,f.jsxs)(_.p,{children:[`Visually, a UV value that stays the same, that doesn't change, is a value that will show no movement, which is exactly what we see when we try `,(0,f.jsx)(u,{message:`I'd show the shader again, but I don't want him to get dizzy.`,children:`rotating our Cashew`}),`.`]}),`
`,(0,f.jsxs)(_.p,{children:[`Hmm.. so if we could find a different function, one that stays fixed at `,(0,f.jsx)(_.code,{children:`(0.5, 0.5)`}),`, the rotation `,(0,f.jsx)(_.em,{children:`pivot`}),` would be in the center.`]}),`
`,(0,f.jsx)(l,{align:`center`,children:(0,f.jsx)(_.strong,{children:`Case Solved!`})}),`
`,(0,f.jsx)(_.p,{children:`Now, what remains is to find that function to help Cashew rotate from the center, as initially intended.`}),`
`,(0,f.jsx)(_.h4,{id:`we-can-do-it-the-hard-way`,children:(0,f.jsx)(_.a,{href:`#we-can-do-it-the-hard-way`,children:`We can do it the hard way...`})}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsx)(_.p,{children:`In the previous post I had briefly mentioned that there was a method to make you leave the course as fast as possible. This is exactly that moment!`}),`
`,(0,f.jsx)(_.p,{children:`Of course, I still don't want you to leave, but we need to look this one in the eyes to fully appreciate the elegance of the solution coming up next.`}),`
`,(0,f.jsx)(s,{sprite:d,fullShader:`void fragment() {
  float angle = TIME;

  vec2 new_uv = vec2(
    (UV.x - 0.5) * cos(angle) - (UV.y - 0.5) * sin(angle) + 0.5,
    (UV.x - 0.5) * sin(angle) + (UV.y - 0.5) * cos(angle) + 0.5
  );

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,children:`// This rotates Cashew around (0.5, 0.5)
vec2 new_uv = vec2(
  (UV.x - 0.5) * cos(angle) - (UV.y - 0.5) * sin(angle) + 0.5,
  (UV.x - 0.5) * sin(angle) + (UV.y - 0.5) * cos(angle) + 0.5
);`}),`
`,(0,f.jsxs)(_.p,{children:[`First of all, if I were to give you an `,(0,f.jsx)(u,{message:`Okay, if you're really curious, the key is to rewrite the rotation so that the point we want to rotate around cancels out the angle-dependent terms. Afterwards, we can easily add a constant equal to the result we want for each coordinate. For UV.x, we replace it with UV.x - 0.5, as that would equal 0 when UV.x is 0.5. We do the same with UV.y and both angle-dependent terms become 0. Lastly, since we want the result to be equal to the initial value, we add 0.5.`,children:`explanation`}),` for how I got to this, I'd have to break my `,(0,f.jsx)(_.em,{children:`'no math'`}),` vow.`]}),`
`,(0,f.jsx)(_.p,{children:`Second of all, even if we did crack that shell and you perfectly understood it, this formula buries all intuition.
Our little detective game was fun for finding the fixed point, but it quickly gets old if you have to interrogate your own code every time you open a project.`}),`
`,(0,f.jsxs)(_.blockquote,{children:[`
`,(0,f.jsx)(_.p,{children:`The code we write should tell us what it does at a single glance`}),`
`]}),`
`,(0,f.jsx)(_.p,{children:`Fortunately, there's another way to do this.`}),`
`,(0,f.jsx)(_.h4,{id:`or-the-easy-way`,children:(0,f.jsx)(_.a,{href:`#or-the-easy-way`,children:`...or the easy way`})}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsx)(_.p,{children:`Let us, again, move away from shaders for a moment.
Pick up a small piece of paper and pinch its top-left corner.
If you spin the paper, it rotates around that pinched point.`}),`
`,(0,f.jsx)(r,{width:260,label:`Rotating Cashew from the top-left corner`,children:(0,f.jsx)(`video`,{src:p,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,type:`video/mp4`})}),`
`,(0,f.jsxs)(_.p,{children:[`Now, keep your hand exactly where it is, but slide the `,(0,f.jsx)(_.del,{children:`canvas`}),` paper over so that your fingers are pinching it right from the middle.
This time, it rotates around its center!`]}),`
`,(0,f.jsx)(r,{width:260,label:`Rotating Cashew from the center`,children:(0,f.jsx)(`video`,{src:m,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,type:`video/mp4`})}),`
`,(0,f.jsxs)(_.p,{children:[`By pinching at a different location, you just picked a new `,(0,f.jsx)(_.strong,{children:`pivot point`}),`.`]}),`
`,(0,f.jsxs)(_.p,{children:[`But you probably noticed something a bit unnatural about that second step.
Instead of moving my hand to the middle of the paper like a normal person, I `,(0,f.jsx)(_.em,{children:`moved the paper to my hand`}),`. Why?`]}),`
`,(0,f.jsx)(_.p,{children:`Because my hand was sitting perfectly comfortably, and I didn't want to move it.`}),`
`,(0,f.jsx)(_.p,{children:`In shaders, we like to be as comfortable as possible.
Our rotation formula feels so much better when it doesn't have a bunch of numbers scattered around. Why ruin its zen?`}),`
`,(0,f.jsx)(_.p,{children:`We already know how to move the canvas around from the previous lesson. Why don't we use that to shift it so its center lands in (0.0, 0.0)?`}),`
`,(0,f.jsxs)(_.p,{children:[`The only caveat is that in real life, if you move the paper slightly, you still see it. Like.. it's in your hand.`,(0,f.jsx)(`br`,{}),`
In shaders, though, we can only see a limited region of our canvas. So when we move it, the image is no longer fully in frame.`]}),`
`,(0,f.jsx)(r,{width:260,label:`Center Rotation with a limited view`,children:(0,f.jsx)(`video`,{src:h,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,type:`video/mp4`})}),`
`,(0,f.jsxs)(_.p,{children:[`That's why, after rotating it, we have to `,(0,f.jsx)(_.em,{children:`take the image back`}),` into frame.`]}),`
`,(0,f.jsxs)(_.p,{children:[`Let's get back to Shader World and `,(0,f.jsx)(u,{message:`I think I've accidentally created an optical illusion. While Cashew rotates, look for a few seconds at its center. If you quickly look somewhere else there's a cool twisting effect. Fun!`,children:`see this`}),` in practice:`]}),`
`,(0,f.jsx)(s,{sprite:d,fullShader:`void fragment() {
  float angle = TIME;

  vec2 centered_uv = UV - vec2(0.5);

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + vec2(0.5);

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,children:`void fragment() {
  float angle = TIME;

  // We already know how to translate our canvas
  // Slide the UV from [0, 1] to [-0.5, 0.5]
  // The UV is now centered at (0, 0)
  vec2 centered_uv = UV - vec2(0.5, 0.5);

  // Rotate using the simpler formula
  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  // Move back the UV to keep the sampled texture in view
  // UV goes from [-0.5, 0.5] back to [0, 1]
  vec2 new_uv = rotated_uv + vec2(0.5, 0.5);

  COLOR = texture(TEXTURE, new_uv);

  // ... discarding logic
}`}),`
`,(0,f.jsx)(_.p,{children:`I'm much happier with our code now:`}),`
`,(0,f.jsxs)(_.ul,{children:[`
`,(0,f.jsxs)(_.li,{children:[`It's `,(0,f.jsx)(_.strong,{children:`readable`}),`: The events are separated. We pick a pivot, rotate around it, then move back into view.`]}),`
`,(0,f.jsxs)(_.li,{children:[`It's `,(0,f.jsx)(_.strong,{children:`straightforward`}),`: The rotation formula stays in its simplest form. We do not pollute it with the pivot math.`]}),`
`,(0,f.jsxs)(_.li,{children:[`It `,(0,f.jsx)(_.strong,{children:`feels natural`}),`: If we want to change the rotation, we change the formula. If we want to change the pivot, we write a different translation value.`]}),`
`,(0,f.jsxs)(_.li,{children:[`It `,(0,f.jsx)(_.strong,{children:`feels great!`})]}),`
`]}),`
`,(0,f.jsx)(_.p,{children:`We can even add a uniform for our pivot now:`}),`
`,(0,f.jsx)(s,{sprite:d,fullShader:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float angle = TIME;

  vec2 centered_uv = UV - pivot;

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + pivot;

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,controls:{pivot:{label:`Pivot`,type:`vec2`,min:0,max:1,defaultVec:[.5,.5]}},children:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float angle = TIME;

  vec2 centered_uv = UV - pivot;

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + pivot;

  COLOR = texture(TEXTURE, new_uv);

  // ... discarding logic
}`}),`
`,(0,f.jsx)(_.p,{children:`Great! We now have a dynamic pivot. The problem is that it's a bit hard to make out what's really happening when you move the sliders.
We could see it better if we had a red circle on top of our texture at the pivot's position.`}),`
`,(0,f.jsxs)(_.p,{children:[`You actually already know how to make a circle. We learned that when we built our portal to Shader World.`,(0,f.jsx)(`br`,{}),`
So, before we continue, I'd like you to try something on your own.`]}),`
`,(0,f.jsxs)(_.p,{children:[`I get it if you can't do it `,(0,f.jsx)(_.em,{children:`right now`}),`.
Maybe you're reading this on your phone, `,(0,f.jsx)(u,{message:`Just make sure you don't fall off! 🚌`,children:`on a bus`}),`, or in some place where coding is not allowed.`]}),`
`,(0,f.jsxs)(_.p,{children:[`Whatever the case, `,(0,f.jsx)(u,{message:`Don't add this to a bookmark you'll never open. Set up an alarm!`,children:`find some time`}),` to `,(0,f.jsx)(_.em,{children:`do it`}),`. `,(0,f.jsx)(`br`,{}),`
This is the fun part! This is where you test your knowledge and this is where you truly learn.`]}),`
`,(0,f.jsxs)(_.p,{children:[`Okay, but before this transforms into a motivational speech, let's open Godot and see `,(0,f.jsx)(u,{message:`Notice how it's split into small problems. This is especially laid out this way so you can practice the GPU dance: What's the problem? -> How do I approach it? -> What tool do I use?`,children:`the challenge`}),`!`]}),`
`,(0,f.jsxs)(c,{children:[(0,f.jsxs)(a,{question:`Write a shader that draws a red circle in the center of the screen.`,children:[(0,f.jsxs)(_.p,{children:[`We can use the `,(0,f.jsx)(_.code,{children:`distance()`}),` function to figure out how far the current pixel is from the center `,(0,f.jsx)(_.code,{children:`(0.5, 0.5)`}),`.`,(0,f.jsx)(`br`,{}),`
If the pixel is reasonably close (let's say... less than `,(0,f.jsx)(_.code,{children:`0.04`}),`), then it's inside the circle.`]}),(0,f.jsxs)(_.p,{children:[`We've got a few options here. We could go with an if statement, a ternary operator, a step or even a smoothstep if you like your circles well done. Let's go with `,(0,f.jsx)(_.code,{children:`step()`}),` and use the result in our red channel.`]}),(0,f.jsx)(s,{sprite:d,fullShader:`void fragment() {
  float dist = distance(UV, vec2(0.5, 0.5));
  float circle = step(0.04, dist);
  COLOR = vec4(circle, 0.0, 0.0, 1.0);
}`,width:260,showCode:!0}),(0,f.jsx)(_.p,{children:`I'm getting flashbacks from my childhood, because we colored outside the lines.`}),(0,f.jsxs)(_.p,{children:[`The `,(0,f.jsx)(_.code,{children:`step()`}),` function returns `,(0,f.jsx)(_.code,{children:`0.0`}),` for values smaller than the set edge, and `,(0,f.jsx)(_.code,{children:`1.0`}),` otherwise. That's why we end up coloring only values `,(0,f.jsx)(_.em,{children:`outside`}),` the circle.
We can easily flip the result by subtracting it from `,(0,f.jsx)(_.code,{children:`1.0`}),`.`]}),(0,f.jsx)(s,{sprite:d,fullShader:`void fragment() {
  float dist = distance(UV, vec2(0.5, 0.5));
  float circle = 1. - step(0.04, dist);
  COLOR = vec4(circle, 0.0, 0.0, 1.0);
}`,width:260,showCode:!0,children:`void fragment() {
  float dist = distance(UV, vec2(0.5, 0.5));
  // Alternatively we could've swapped the arguments: 
  // step(dist, 0.04) Think about why that works.
  float circle = 1. - step(0.04, dist);
  COLOR = vec4(circle, 0.0, 0.0, 1.0);
}`})]}),(0,f.jsxs)(a,{question:(0,f.jsxs)(f.Fragment,{children:[`Use a `,(0,f.jsx)(_.i,{children:`pivot`}),` vec2 uniform to replace the hardcoded center position and freely move the point around.`]}),children:[(0,f.jsxs)(_.p,{children:[`I know what you're thinking. We've already done this before.`,(0,f.jsx)(`br`,{}),`
You're right! Let's do it again.`]}),(0,f.jsx)(s,{sprite:d,fullShader:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float dist = distance(UV, pivot);
  float circle = 1. - step(0.04, dist);
  COLOR = vec4(circle, 0.0, 0.0, 1.0);
}`,width:260,showCode:!0,controls:{pivot:{label:`Pivot`,type:`vec2`,min:0,max:1,defaultVec:[.5,.5]}}})]}),(0,f.jsxs)(a,{question:(0,f.jsxs)(f.Fragment,{children:[`Try `,(0,f.jsx)(_.b,{children:`mix`}),`ing the circle with a rotating texture. You can use the default Godot svg that comes with any project or even `,(0,f.jsx)(_.a,{href:`/cashew.jpg`,download:`cashew.jpg`,children:`download Cashew`}),`.`]}),children:[(0,f.jsx)(_.p,{children:`As a short reminder, here's how we sampled and rotated Cashew:`}),(0,f.jsx)(s,{sprite:d,fullShader:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float angle = TIME;

  vec2 centered_uv = UV - pivot;

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + pivot;

  COLOR = texture(TEXTURE, new_uv);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,controls:{pivot:{label:`Pivot`,type:`vec2`,min:0,max:1,defaultVec:[.5,.5]}},children:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float angle = TIME;

  vec2 centered_uv = UV - pivot;

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + pivot;

  COLOR = texture(TEXTURE, new_uv);

  // ... discarding logic
}`}),(0,f.jsxs)(_.p,{children:[`If we add the result from the second exercise to this shader all that's left is to use the `,(0,f.jsx)(_.code,{children:`mix()`}),` function to combine the texture color with the color red.
If we're inside the red circle, we'll paint red, otherwise we'll paint the texture.`]}),(0,f.jsxs)(_.p,{children:[`The code below might look long, but it's just the rotation and the circle glued together.
Take a look at it and make sure you don't miss anything `,(0,f.jsx)(t,{color:`#FC7F7F`,children:(0,f.jsx)(_.em,{children:`important`})}),`.`]}),(0,f.jsx)(s,{sprite:d,fullShader:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float angle = TIME;

  float distance_from_pivot = distance(UV, pivot);
  float pivot_marker = 1. - step(0.04, distance_from_pivot);

  vec2 centered_uv = UV - pivot;

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + pivot;

  vec4 texture_color = texture(TEXTURE, new_uv);
  vec4 marker_color = vec4(1.0, 0.0, 0.0, 1.0);

  COLOR = mix(texture_color, marker_color, pivot_marker);

  if (
    new_uv.x < 0.0 || new_uv.x > 1.0 ||
    new_uv.y < 0.0 || new_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,controls:{pivot:{label:`Pivot`,type:`vec2`,min:0,max:1,defaultVec:[.5,.5]}},children:`uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  float angle = TIME;

  // Generate the circle region
  // IMPORTANT: we want this to be a static point
  // That's why we do it with the initial UV, 
  // not the rotating one
  float distance_from_pivot = distance(UV, pivot);
  float pivot_marker = 1. - step(0.04, distance_from_pivot);

  vec2 centered_uv = UV - pivot;

  vec2 rotated_uv = vec2(
      centered_uv.x * cos(angle) - centered_uv.y * sin(angle),
      centered_uv.x * sin(angle) + centered_uv.y * cos(angle)
  );

  vec2 new_uv = rotated_uv + pivot;

  // We save both colors and later decide which one to pick
  vec4 texture_color = texture(TEXTURE, new_uv);
  vec4 marker_color = vec4(1.0, 0.0, 0.0, 1.0);

  // Pick the texture_color if outside the circle
  // Pick red otherwise
  COLOR = mix(texture_color, marker_color, pivot_marker);

  // ... discarding logic
}`}),(0,f.jsx)(l,{align:`center`,children:`Well done! You just gave Cashew a clown career!`})]})]}),`
`,(0,f.jsx)(_.h4,{id:`but-theres-more`,children:(0,f.jsx)(_.a,{href:`#but-theres-more`,children:`But there's more!`})}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsx)(_.p,{children:`This is the second time we meet this chapter. Shaders are full of surprises.⭐`}),`
`,(0,f.jsx)(_.p,{children:`As you might've assumed, setting a pivot not only helps with rotations, but it actually helps with all kinds of transformations and effects!`}),`
`,(0,f.jsx)(_.p,{children:`Take, for example, our previous scale shader:`}),`
`,(0,f.jsx)(s,{sprite:g,controls:{scale:{label:`Scale`,type:`float`,min:0,max:4,default:1}},fullShader:`uniform float scale = 1.0;

void fragment() {
  vec2 scaled_uv = UV * scale;

  COLOR = texture(TEXTURE, scaled_uv);

  if (
    scaled_uv.x < 0.0 || scaled_uv.x > 1.0 ||
    scaled_uv.y < 0.0 || scaled_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,children:`// For zooming we want uniform scale
// so we'll use the same value for x and y scaling
uniform float scale = 1.0;

void fragment() {
  vec2 scaled_uv = UV * scale;

  COLOR = texture(TEXTURE, scaled_uv);
  
  // ... discarding logic
}`}),`
`,(0,f.jsxs)(_.p,{children:[`The detective job is calling again! We need to look for clues with our spyglass as there might be a secret message inside one of Cashew's eyes. The `,(0,f.jsx)(u,{message:`Please pretend you do not see it when the zoom level is normal`,children:`only way we can see it`}),` is if we zoom in to it.`]}),`
`,(0,f.jsxs)(_.p,{children:[`Since the current shader only zooms in the top-left corner, we need to call our `,(0,f.jsx)(_.em,{children:`pivot`}),` friend again!`]}),`
`,(0,f.jsxs)(_.p,{children:[`Similarly to the rotation, zooming is also just a function. A much simpler one, but a function nonetheless.`,(0,f.jsx)(`br`,{}),`
The `,(0,f.jsx)(_.em,{children:`pivot`}),` of this function is in `,(0,f.jsx)(_.code,{children:`(0.0, 0.0)`}),` by default, so changing the zoom location should be `,(0,f.jsx)(u,{message:`Even though some of the examples I show are not part of the challenges, you can always try solving issues yourself before reading the solution. Especially in the "But there's more!" chapter, which I've just decided is probably going to reappear, I'm going to show more applications of a concept which you already know. Give it a shot!`,children:`as simple as before`}),`.`]}),`
`,(0,f.jsx)(s,{sprite:g,controls:{scale:{label:`Scale`,type:`float`,min:0,max:4,default:1},pivot:{label:`Pivot`,type:`vec2`,min:0,max:1,defaultVec:[.5,.5]}},fullShader:`uniform float scale = 1.0;
uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  vec2 uv_with_pivot = UV - pivot;
  vec2 scaled_uv = uv_with_pivot * scale;
  scaled_uv = scaled_uv + pivot;

  COLOR = texture(TEXTURE, scaled_uv);

  if (
    scaled_uv.x < 0.0 || scaled_uv.x > 1.0 ||
    scaled_uv.y < 0.0 || scaled_uv.y > 1.0
  ) {
    discard;
  }
}`,width:260,showCode:!0,children:`uniform float scale = 1.0;
uniform vec2 pivot = vec2(0.5, 0.5);

void fragment() {
  vec2 uv_with_pivot = UV - pivot;
  vec2 scaled_uv = uv_with_pivot * scale;
  scaled_uv = scaled_uv + pivot;

  COLOR = texture(TEXTURE, scaled_uv);
  
  // ... discarding logic
}`}),`
`,(0,f.jsx)(_.h4,{id:`the-pivot-is-not-the-point`,children:(0,f.jsx)(_.a,{href:`#the-pivot-is-not-the-point`,children:`The pivot is not the point`})}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsxs)(_.p,{children:[`Alright, being able to choose the point of our UV is a nice example of what we can do in order to make our life easier. However, despite holding the name of the lesson, `,(0,f.jsx)(_.em,{children:`the pivot`}),` is not the point.`]}),`
`,(0,f.jsxs)(_.blockquote,{children:[`
`,(0,f.jsx)(_.p,{children:`The point of this chapter is learning how to make our life easier`}),`
`]}),`
`,(0,f.jsxs)(_.p,{children:[`It's not only the pivot we can change to achieve that. For example, shaders love trigonometry.
Most functions that deal with angles, such as `,(0,f.jsx)(_.code,{children:`sin`}),` and `,(0,f.jsx)(_.code,{children:`cos`}),`, are easiest to understand and work with in the right system. That system is `,(0,f.jsx)(_.strong,{children:`The Unit Circle`}),`.`]}),`
`,(0,f.jsxs)(_.p,{children:[`It's a circle centered at `,(0,f.jsx)(_.code,{children:`(0.0, 0.0)`}),` which sits comfortably when both axes range from `,(0,f.jsx)(_.code,{children:`[-1.0, 1.0]`}),`.`]}),`
`,(0,f.jsxs)(_.p,{children:[`We know how to make our lives easier by sliding the UV pivot to `,(0,f.jsx)(_.code,{children:`(0.0, 0.0)`}),`, but after we finish sliding, the UVs only range between `,(0,f.jsx)(_.code,{children:`[-0.5, 0.5]`}),`.`]}),`
`,(0,f.jsxs)(_.p,{children:[`We could put an end to it right here, but nobody is stopping us from making our lives even easier. `,(0,f.jsx)(`br`,{}),`
If we take that shifted space and multiply it by 2.0, we land in `,(0,f.jsx)(_.code,{children:`[-1.0, 1.0]`}),`, matching the system of the unit circle.`]}),`
`,(0,f.jsxs)(_.p,{children:[`This is going to prove incredibly useful in our next lesson in which we'll learn how to `,(0,f.jsx)(_.strong,{children:`treat functions as brushes`}),` and get rid of most math you'll see in any future shaders.`]}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsxs)(_.p,{children:[`Don't look now, but I think the Unit Circle turned red just by noticing you.`,(0,f.jsx)(`br`,{}),`
Alright, you two! I'll leave you alone to get to know each other.`]}),`
`,(0,f.jsx)(s,{fullShader:`void fragment() {
  vec2 uv = UV - 0.5;
  uv = uv * 2.0;

  float unit_circle = step(
    distance(uv, vec2(0.0)),
    1.0
  );

  COLOR = vec4(unit_circle, 0.0, 0.0, 1.0);
}`,width:260,showCode:!0}),`
`,(0,f.jsx)(_.p,{children:`Thank you so much for reading! Until next time, happy shading!`}),`
`,(0,f.jsx)(n,{}),`
`,(0,f.jsxs)(_.p,{children:[`Writing this course, building shaders and interactive previews for them is really fun, but requires a large chunk of time and an even larger amount of peanuts. 🥜`,(0,f.jsx)(`br`,{}),`
Fun cannot buy peanuts, but YOU CAN!`]}),`
`,(0,f.jsxs)(_.p,{children:[`If you genuinely feel like this guide helped you and you want it to continue, consider supporting my work!`,(0,f.jsx)(`br`,{}),`
This series will stay entirely free, independent and clear of ads, but its completion and development speed will be greatly influenced by your help!`]}),`
`,(0,f.jsxs)(_.p,{children:[`You can find all the ways to keep the portal alive down below.`,(0,f.jsx)(`br`,{}),`
Thank you so much!`]}),`
`,(0,f.jsx)(o,{}),`
`,(0,f.jsx)(i,{postId:`shaders-4`})]})}function v(e={}){let{wrapper:t}=e.components||{};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(_,{...e})}):_(e)}export{v as default};