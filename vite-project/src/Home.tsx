import { SetStateAction, useState } from "react";
import "./App.css"
import { Link } from 'react-router-dom';

 

function Home() {

    const code = `
    {
        "ayas": [                           
          "ﺇﻧﺎ ﺃﻋﻄﻴﻨﺎﻙ ﺍﻟﻜﻮﺛﺮ",
          "ﻓﺼﻞ ﻟﺮﺑﻚ ﻭﺍﻧﺤﺮ",     
          "ﺇﻥ ﺷﺎﻧﺌﻚ ﻫﻮ ﺍﻷﺑﺘﺮ"
        ],
        "length": "3",                      
        "name": "Abundance (Al-Kawthar)",   
        "number": 108,                      
        "order": "15",                  
        "place": "Meccan"  
    }
    `;

    const commented_code = `
    {
        "ayas": [                           // List of verses in Arabic
          "ﺇﻧﺎ ﺃﻋﻄﻴﻨﺎﻙ ﺍﻟﻜﻮﺛﺮ",
          "ﻓﺼﻞ ﻟﺮﺑﻚ ﻭﺍﻧﺤﺮ",     
          "ﺇﻥ ﺷﺎﻧﺌﻚ ﻫﻮ ﺍﻷﺑﺘﺮ"
        ],
        "length": "3",                      // Number of verses
        "name": "Abundance (Al-Kawthar)",   // Name of the chapter [English, Arabic]
        "number": 108,                      // Order of the chapter in the Quran
        "order": "15",                      // Revelation order of the chapter
        "place": "Meccan"                   // Revelation order (Meccan/Medinan)
    }
    `;

    const python = `
    import requests

    url = "quranapi.com/api/path/to/endpoint"
    response = requests.get(url)
    data = response.json()
    `;

    const javascript = `
    fetch('quranapi.com/api/path/to/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        `;

    const cpp = `
    #include &lt;iostream&gt;
    #include &lt;curl/curl.h&gt;
                    
    size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    size_t total_size = size * nmemb;
    output->append((char*)contents, total_size);
    return total_size;
    }
                    
    int main() {
        CURL* curl;
        CURLcode res;
                    
        curl_global_init(CURL_GLOBAL_DEFAULT);
        curl = curl_easy_init();
                    
        if (curl) {
            std::string api_endpoint = "quranapi.com/api/path/to/endpoint";
            std::string response_data;
                    
            curl_easy_setopt(curl, CURLOPT_URL, api_endpoint.c_str());
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response_data);
                    
            res = curl_easy_perform(curl);
                    
            if (res != CURLE_OK)
                fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
            else
                std::cout << response_data << std::endl;
                    
                curl_easy_cleanup(curl);
        }
                    
        curl_global_cleanup();
                    
        return 0;
    }
    `;
    const java = `
    import java.net.HttpURLConnection;
    import java.net.URL;
    import java.io.BufferedReader;
    import java.io.InputStreamReader;

    public class ApiExample {
        public static void main(String[] args) {
            try {
                // Specify the URL of the API endpoint
                URL url = new URL("quranapi.com/api/path/to/endpoint");

                // Open a connection to the URL
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();

                // Set the request method (GET, POST, etc.)
                connection.setRequestMethod("GET");

                // Get the response code
                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    // Read the response from the API
                    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String inputLine;
                    StringBuilder response = new StringBuilder();

                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }

                    // Close the connection and print the response
                    in.close();
                    System.out.println("API Response: " + response.toString());
                } else {
                    System.out.println("API request failed. Response Code: " + responseCode);
                }

                // Close the connection
                connection.disconnect();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
`;

    const ruby = `
    require 'net/http'
    require 'json'

    url = URI.parse('quranapi.com/api/path/to/endpoint')
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true # For HTTPS requests

    request = Net::HTTP::Get.new(url.path, { 'Content-Type' => 'application/json' })
    response = http.request(request)

    if response.code.to_i == 200
    result = JSON.parse(response.body)
    # Do something with the result
    else
    puts "Error: #{response.code} - #{response.message}"
    end
`
    const php = `
    &lt?php

    $api_url = 'quranapi.com/api/path/to/endpoint';
    $ch = curl_init($api_url);

    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL session
    $response = curl_exec($ch);

    // Check for errors
    if(curl_errno($ch)){
        echo 'Curl error: ' . curl_error($ch);
    } else {
        // Do something with the API response
        echo $response;
    }

    // Close cURL session
    curl_close($ch);
    ?>
`

    const [toggle, setToggle] = useState(1);

    function updateToggle(id: SetStateAction<number>) {
        setToggle(id);
    }
    return <div>

            <div id="home"></div>

            <nav className="navbar" id="navbar">
                <ul><li><a className="title">quran API</a></li></ul>
                <ul>
                    <li><a href="#home">OVERVIEW</a></li>
                    <li><a href="#docs">DOCS</a></li>
                    <li><a style={{cursor:"pointer"}} onClick={()=>{window.open('http://localhost:5000/api/docs/', '_blank')}} className="doc-button">TRY NOW</a></li>
                </ul>
            </nav>   

            <div className="home">
                <div className="home-left">
                    <h1 className="heading">The only <span className="Quran">Quran</span> API you'll ever need.</h1>
                </div>
                <div className="home-right">
                    <p>Explore the Quran effortlessly with our API. Access sacred verses for diverse applications, from education to spiritual growth. Empower your digital ventures with seamless integration and profound wisdom. Start your journey with our user-friendly Quran API today.</p>                   
                    <p>Narrated by Uthman ibn Affan (may Allah be pleased with him):
"I heard the Messenger of Allah (ﷺ) saying: 'The best among you is the one who learns the Quran and teaches it.'" (Sahih al-Bukhari 4739, Book 66, Hadith 4)</p>
                </div>
            </div>   

            <div className="documentation" id="docs">
                    <h1 className="docs-title">API Documentation</h1>
                    <h2>Endpoints</h2>
                    <div>
                        <p><code>/api/chapter/all</code> : Returns a list of all chapters in the Quran.</p>
                        <p><code>/api/chapter/&lt;int:chapterNumber&gt;</code> : Returns a chapter identified by its order in the Quran.</p>
                        <p><code>/api/verse/&lt;int:verseNumber&gt;</code> : Returns the ayah content along with the surah number and ayah number within the surah.</p>
                        <p><code>/api/chapter/meccan</code> : Returns a list of all Meccan chapters in the Quran.</p>
                        <p><code>/api/chapter/medinan</code> : Returns a list of all Medinan chapters in the Quran.</p>
                    </div>
                    <div>
                        <h2>Chapter Structure</h2>
                        <p>Each chapter returned is structued in JSON to allow for indexing into metadata.</p>

                        <div className="code-block" dangerouslySetInnerHTML={{ __html: `<pre><code>${code}</code></pre>` }} />
                        <div className="code-block-commented" dangerouslySetInnerHTML={{ __html: `<pre><code>${commented_code}</code></pre>` }} />
               
                    </div>
                    <div>
                        <h2>Using the API</h2>

                        <ul className="languages">
                            <li className={toggle === 1 ? "selected" : "not-selected"} onClick={() => updateToggle(1)}>Python</li>
                            <li className={toggle === 2 ? "selected" : "not-selected"} onClick={() => updateToggle(2)}>JavaScript</li>
                            <li className={toggle === 3 ? "selected" : "not-selected"} onClick={() => updateToggle(3)}>C++</li>
                            <li className={toggle === 4 ? "selected" : "not-selected"} onClick={() => updateToggle(4)}>Java</li>
                            <li className={toggle === 5 ? "selected" : "not-selected"} onClick={() => updateToggle(5)}>Ruby</li>
                            <li className={toggle === 6 ? "selected" : "not-selected"} onClick={() => updateToggle(6)}>PHP</li>
                        </ul>

                        <div className="tutorial-code">
                            <div className={toggle === 1 ? "show" : "none"}>
                                <p>To use the API with Python 3, ensure the <code>requests</code> library is installed on your local machine by running the following command in your terminal: <code>pip install requests</code> .</p>
                                <p>Then run the following code:</p>
                                <div dangerouslySetInnerHTML={{ __html: `<pre><code>${python}</code></pre>` }} />
                            </div>
                            <div className={toggle === 2 ? "show" : "none"}>
                                <p>In any JavaScript environment, run the following code:</p>
                                <div dangerouslySetInnerHTML={{ __html: `<pre><code>${javascript}</code></pre>` }} />
                            </div>
                            <div className={toggle === 3 ? "show" : "none"}>
                                <p>To use the API with C++, follow the <a href="https://curl.se/docs/install.html">curl documentation</a> to set up the <code>libcurl</code> library on your local machine.</p>
                                <p>Then run the following code:</p>
                                <div dangerouslySetInnerHTML={{ __html: `<pre><code>${cpp}</code></pre>` }} />
                            </div>
                            <div className={toggle === 4 ? "show" : "none"}>

                                <p>With JDK installed on your local machine, run the following Java code:</p>
                                <div  dangerouslySetInnerHTML={{ __html: `<pre><code>${java}</code></pre>` }} />
                            </div>
                            <div className={toggle === 5 ? "show" : "none"}>

                                <p>To use the API with Ruby, ensure the <code>net/http</code> and <code>json</code> libraries are installed on your local machine by running the following command in your terminal: <code>gem install net-http json</code></p>
                                <p>Then run the following code:</p>
                                <div dangerouslySetInnerHTML={{ __html: `<pre><code>${ruby}</code></pre>` }} />
                            </div>
                            <div className={toggle === 6 ? "show" : "none"}>
                                <p>Run the following PHP code:</p>
                                <div dangerouslySetInnerHTML={{ __html: `<pre><code>${php}</code></pre>` }} />
                            </div>
        
                        </div>
                    </div>

                    <div>
                        <h2>Rate-limiting</h2>
                        <p>Each endpoint is restricted to a 1000 call per hour limit.</p>
                    </div>

                    <div className="contribution">
                        <h2>Contribution</h2>
                        <p>Our API is 100% open source and transparent, and can be further explored on our <a href="https://github.com/QuranAPi/quran-api">GitHub Repository</a>.</p>
                        <p>Feel free to raise issues, submit pull requests, and be part of our open-source community.</p>
                        
                    </div>
                    <img src="./src/assets/logo.png"></img>


            </div>

    </div>
}
  
  export default Home;