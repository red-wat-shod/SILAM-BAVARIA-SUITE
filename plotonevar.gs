function plotonevar(args)

infile = subwrd(args,1)
outDir =  subwrd(args,2)
sp =  subwrd(args,3)

unit='ug/m3'
  clevs='set clevs .1 .2 .5 1 2 5 10 20 50 100 200'
if (sp = "PM2_5")
   var='cnc_'sp
else 
  if (sp = "PM10")
     var='cnc_'sp
  else
    if (sp= "CO")
       clevs='set clevs .05 .1 .2 .3 .5 .7 1 1.2 1.5 2'
       unit='mg/m3'
       var='cnc_'sp'_gas/1000'
    else
      if (sp= "O3")
         clevs='set clevs 20 40 60 80 100 120 140 160 180 200'
         var='cnc_'sp'_gas'
      else
        if (sp= "SO2")
           clevs='set clevs .1 .2 .5 1 2 5 10 20 50 100'
           var='cnc_'sp'_gas'
        else
          var='cnc_'sp'_gas'
        endif 
      endif 
    endif 
  endif
endif

'reinit'

*'quit'
'xdfopen 'infile

'set gxout grfill'
'set mpdset hires'
'colors def_lowwhite'
'!mkdir -p 'outDir

'q file'
dimline=sublin(result,5)
nT=subwrd(dimline,12) 


t =  1 
while (t<=nT)
  
  'set t 't
  'q dims'
  dateline = sublin(result,5)
  datetime = subwrd(dateline,6)
  time = substr(datetime,1,2)
  date = substr(datetime,4,11)
  
  'set grads off'
   clevs
  'd 'var
  'cbar'
  'draw title 'sp' 'unit' 'time':00, 'date
  
   pic=outDir'/'sp'_'math_format("%03g",t)'.png'
  'printim 'pic' white x600 y800'
   say pic
  'c'
  t = t + 1
*  break
endwhile
*  '!xli 'pic
'quit'


