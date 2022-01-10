import "../App";

function Definition(props) {
    const define = props.name;

    const play = () => {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = props && define && define.word;

            if (msg.text === 'undefined') {
                var emptySpeak = new SpeechSynthesisUtterance();
                emptySpeak.text = "search for a word";

                window.speechSynthesis.speak(emptySpeak);
            } else {
                window.speechSynthesis.speak(msg);
            }
        } else {
            console.log("Sorry!! Cannot speak the word");
        }
    }

    return (
        <div className="outer">
            {define && (<div className="meaning">
                <div className="definition">
                    <button onClick={ play }>{ define && <i class="fas fa-volume-down"></i> }</button> 
                    <h3 className="word"><span>{ props && define && define.word }</span></h3>   
                </div>
                <div><p className="def">Definitions:</p>
                <p className="para-1">{ props && define && define.meanings[0].partOfSpeech }</p>
                <p className="para-2"><ol><li>{ props && 
                                                define && define.meanings[0] && 
                                                define.meanings[0].definitions[0].definition 
                }</li></ol></p>
                <p className="para-3">"{ props && define && define.meanings[0] && define.meanings[0].definitions[0].example }"</p>
                <p className="para-4">synonyms: ["{ props &&
                define && 
                define.meanings[0] && 
                define.meanings[0].definitions[0].example && 
                define.meanings[0].definitions[0].synonyms }"]</p>

                </div>
            </div>)}
        </div>
    )
}

export default Definition;