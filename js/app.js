  var _LETTERS_ = 'GFEDCBA',
                    _A_ = 0,
                    _B_ = 1,
                    _C_ = 2,
                    _D_ = 3,
                    _E_ = 4,
                    _F_ = 5,
                    _G_ = 6



            var settings = {
                rows: 7,
                cols: 16,
                rowCssPrefix: 'row-',
                colCssPrefix: 'col-',
                seatWidth: 35,
                seatHeight: 35,
                seatCss: 'seat',
                selectedSeatCss: 'selectedSeat',
                selectedSeatReservedCss: 'selectedSeatReserved',
                selectingSeatCss: 'selectingSeat'
            };



            var init = function(reservedSeat) {


                var str = [], seatNo, className, seatal;

                for (var i = _A_; i <= _G_; i++) {




                    for (j = 0; j < settings.cols; j++) {


                        seatNo = _LETTERS_[i] + "" + (j + 1);


                        className = settings.seatCss + ' ' + settings.rowCssPrefix + i.toString() + ' ' + settings.colCssPrefix + j.toString();
                        if ($.isArray(reservedSeat) && $.inArray(seatNo, reservedSeat) != -1) {
                            className += ' ' + settings.selectedSeatCss;
                        }
                        str.push('<li class="' + className + '"' +
                                'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
                                '<a title="' + seatNo + '">' + seatNo + '</a>' +
                                '</li>');
                    }
                }
                $('#place').html(str.join(''));
            };

            $(function() {

//$( "#holder" ).prop( "disabled", true );
                $("#holder").children().prop('disabled', true);


                $('#btnShow').click(function() {
                    var str = [];
                    $.each($('#place li.' + settings.selectedSeatCss + ' a, #place li.' + settings.selectingSeatCss + ' a'), function(index, value) {
                        str.push($(this).attr('title'));
                    });
                    alert(str.join(','));
                })

                $('#btnShowNew').click(function() {
                    var str = [], item;
                    $.each($('#place li.' + settings.selectingSeatCss + ' a'), function(index, value) {
                        item = $(this).attr('title');
                        str.push(item);
                        
                        console.log($(this));
                          $(this).parent("li").removeClass(settings.selectingSeatCss);
                         $(this).parent("li").toggleClass(settings.selectedSeatReservedCss);
                    });
                    // alert(str.join(','));
                   
                    $("#usertable").append("<tr><td>" + sessionStorage.getItem("name") + "</td><td>" + sessionStorage.getItem("seats") + "</td><td>" + str.join(',') + "</td><tr>")
                })


                $('#btnConfirm').click(function() {
                    sessionStorage.removeItem("maxitem");
                    sessionStorage.removeItem("seats");

                    sessionStorage.setItem("seats", $("#txtseats").val());
                    sessionStorage.setItem("name", $("#txtname").val());

//                    init();

                    $("#holder").children().prop('enabled', true);

                })


                $('#btnClear').click(function() {
                    sessionStorage.removeItem("maxitem");
                    sessionStorage.removeItem("seats");

                    $("#txtseats").val('');
                    $("#txtname").val('');

                    init();



                });

                init();
            });






            $(document).on('click', '.' + settings.seatCss, function() {
                if ($(this).hasClass(settings.selectedSeatReservedCss)) {
                    alert('This seat is already reserved');
                }

                else if (sessionStorage.getItem("maxitem") == null && sessionStorage.getItem("seats") == null)
                {
                    alert("Please select number of seats first");
                }
                else {

                    var str = [], item, i = 0;
                    $.each($('#place li.' + settings.selectingSeatCss + ' a'), function(index, value) {
                        i++;

                        if (i >= parseInt(sessionStorage.getItem("seats")))
                        {
                            console.log(i);
                            sessionStorage.setItem("maxitem", i);
//                            alert("You cannot select more seats");
                            return;
                        }
                        else
                        {

                            item = $(this).attr('title');
                            str.push(item);

                        }

                    });

                    if (parseInt(sessionStorage.getItem("maxitem")) == null)
                    {

                        alert("Please enter the number of seats");

                    }

                    else if (parseInt(sessionStorage.getItem("maxitem")) == parseInt(sessionStorage.getItem("seats")))
                    {

                        alert("You cannot select more seats");


                    }
                    else
                    {
                        $(this).toggleClass(settings.selectingSeatCss);
                    }



                }
            });

