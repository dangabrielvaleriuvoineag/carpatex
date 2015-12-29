$(document).ready(function(){
	$('.quickSearchButton_eon').click(function(){        
		$(this).parent('form').find(':input').each(function(){
            if(this.type =='text' || this.type =='textarea' || this.type =='password' ){
                if(this.value == this.title && this.title != ''){
                    $(this).val("");
                }
            }
        });
		$(this).parents('form').submit();	
	});
    $(".defaultText_eon").focus(function(srcc)
    {
        if ($(this).val() == $(this)[0].title)
        {
            $(this).removeClass("defaultTextActive");
            $(this).val("");
        }
    });
    
    $(".defaultText_eon").blur(function()
    {
        if ($(this).val() == "")
        {
            $(this).addClass("defaultTextActive");
            $(this).val($(this)[0].title);
        }
    });
    $("input.defaultText_eon:image, input.defaultText_eon:button, input.defaultText_eon:submit").click(function(){

    });
    $(".defaultText_eon").blur();        
});
