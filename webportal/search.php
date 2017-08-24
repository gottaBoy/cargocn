<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="format-detection" content="telephone=no"/>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <title>Search results</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Links -->

    <!--JS-->
    <script src="js/jquery.js"></script>
    <script src="js/jquery-migrate-1.2.1.min.js"></script>

    <!--[if lt IE 9]>
    <div style=' clear: both; text-align:center; position: relative;'>
        <a href="http://windows.microsoft.com/en-US/internet-explorer/..">
            <img src="images/ie8-panel/warning_bar_0000_us.jpg" border="0" height="42" width="820"
                 alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."/>
        </a>
    </div>
    <script src="js/html5shiv.js"></script>
    <![endif]-->
    <script src='js/device.min.js'></script>
</head>
<body>
<div class="page text-center">
    <!-- SVG Sprite -->
    <div style="height: 0; width: 0; position: absolute; visibility: hidden;" aria-hidden="true">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <symbol id="ripply-scott" viewBox="0 0 100 100">
                <circle id="ripple-shape" cx="1" cy="1" r="1"/>
            </symbol>
        </svg>
    </div>
    <!-- /end sprite -->
    <!--========================================================
                              HEADER
    =========================================================-->
    <header class="mod-1">
        <section class="well-sm">
            <div id="stuck_container" class="stuck_container">
                <div class="container">
                    <nav class="navbar navbar-default navbar-static-top ">
                        <div class="navbar-header">
                            <h1 class="navbar-brand">
                                <a href="./">
                                    <span>T</span>RANS
                                </a>
                            </h1>
                        </div>
                        <ul class="navbar-nav sf-menu navbar-right" data-type="navbar">
                            <li>
                                <a href="./">Home</a>
                            </li>
                            <li class="dropdown">
                                <a href="index-1.html">About</a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#">Trucking</a>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <a href="#">Local</a>
                                            </li>
                                            <li>
                                                <a href="#">International</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Air transportation</a>
                                    </li>
                                    <li>
                                        <a href="#">Marine transportation</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="index-2.html">Services</a>
                            </li>
                            <li>
                                <a href="index-3.html">Price list</a>
                            </li>

                            <li>
                                <a href="index-4.html">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </header>
    <!--========================================================
                              CONTENT
    =========================================================-->
  <main>
    <section id="content" class="content well text-center">
        <div class="container">
            <div class="search-form">
                <form id="search" action="search.php" method="GET" accept-charset="utf-8">
                    <label class="search-form_label" for="in">
                        <input id="in" class="search-form_input" type="text" name="s"
                               placeholder="Search"/>
                        <span class="search-form_liveout"></span>
                    </label>
                    <button type="submit" class="search-form_submit"></button>
                </form>
            </div>
            <h3>Search Results</h3>
            <div id="search-results"></div>
        </div>
    </section>
  </main>  

    <!--========================================================
                            FOOTER
    =========================================================-->
    <footer>
        <section class="well">
            <div class="container">
                <p class="rights">
                    Copyright &#169; <span id="copyright-year"></span>
                    Trans Transportation Company.
                    <a href="index-5.html">Privacy Policy</a>
                </p>
            </div>
        </section>
    </footer>
</div>


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<script src="js/tm-scripts.js"></script>
<!-- </script> -->
</body>
</html>
