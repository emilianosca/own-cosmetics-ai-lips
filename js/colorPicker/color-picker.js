// Function that converts hex to rgb

console.log('color-picker.js loaded');

function hexToRgb(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    let rgb = { 
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    }
    // transfrom the rgb object to a string
    return `(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }
  
  // change color of svg overlay
  function changeSvgColor(color) {
    $('.svg-overlay').css("fill", "grey");
    $(".selected-color-fill").css('fill', color);
    $("#lipstick-formula-container input:radio:checked").closest('label').find('svg').css('fill', color);
  }
  
  function main() {
  
    // Function that creates a new instance of the color picker
    if ($("#slider-color-picker").length > 0 ) {
      let width = $('#slider-color-picker').innerWidth();
      let selected_hexa_color = $("#lipstick-base-color input:radio:checked").data('hexa-color');
      changeSvgColor(selected_hexa_color);
  
      let sliderPicker = new iro.ColorPicker("#slider-color-picker",  {
      
        width: width,
        color: selected_hexa_color,
        borderWidth: 0,
        borderColor: "#000",
        handleRadius: 26,
        layout: [
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'hue',
              sliderSize: 35,
            }
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'saturation',
              sliderSize: 35,
              
            }
          },
  
          {
            component: iro.ui.Slider,
            options: { 
              sliderType: 'value',
              sliderSize: 35,
            }
          },
        ]
      });
  
      $('.IroColorPicker .IroSlider:nth-of-type(1)').addClass('d-none');
      
      sliderPicker.on("color:change", function(color) {
        changeSvgColor(color.hexString); // change color of lipstick type
        selected_hexa_color = color.hexString;
        $('#color_swatch_color_hexa').val(selected_hexa_color);
        }
      );
  
      $("#lipstick-base-color input[type=radio]").on('change', function () {
        if($(this).val() == 8) {
          $('.IroColorPicker .IroSlider:nth-of-type(1)').removeClass('d-none');
        } else {
          $('.IroColorPicker .IroSlider:nth-of-type(1)').addClass('d-none');
        }
        let hexa_color = $(this).data('hexa-color');
        changeSvgColor(hexa_color); // change color of lipstick type
        sliderPicker.setColors([hexa_color]); // change color of slider picker
        selected_hexa_color = hexa_color;
        $('#color_swatch_color_hexa').val(selected_hexa_color);
      });
  
      $("#lipstick-formula-container input[type=radio]").on('change', function () {
        changeSvgColor(selected_hexa_color);
      });
  
      // When window is resized change slidepricket width
      $(window).resize(function () {
        let newWidth = $('#slider-color-picker').innerWidth();
        sliderPicker.resize(newWidth);
      });
    }
  }
  
  
  
  //change color of lipstick type when radio button is clicked
  document.addEventListener('turbo:load', function () {
    main();
  });
  
  
  
  