const projectName = "markdown-previewer";
localStorage.setItem('example_project', 'Markdown Previewer');

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized ? 
          ['editorWrap maximized', 
           'previewWrap hide', 
           'fa fa-compress'] : 
          this.state.previewMaximized ?
          ['editorWrap hide', 
           'previewWrap maximized', 
           'fa fa-compress'] :
          ['editorWrap', 
           'previewWrap', 
           'fa fa-arrows-alt'];
    return (
      <div>
        <div className={classes[0]}>
          <Toolbar 
            icon={classes[2]} 
            onClick={this.handleEditorMaximize}
            text="Editor"/>
          <Editor markdown={this.state.markdown} 
            onChange={this.handleChange} />
        </div>
        <div className="converter">
        </div>
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]} 
            onClick={this.handlePreviewMaximize}
            text="Previewer"/>
          <Preview  markdown={this.state.markdown}/>
        </div>
      </div>
    )
  }
};

const Toolbar = (props) => {
    return (
      <div className="toolbar">
        <i title="no-stack-dub-sack"/>      
        {props.text}
        <i onClick={props.onClick} className={props.icon}></i>
      </div>
   )
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"/>
    )
}

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}

const placeholder = 
`# React Markdown Previewer!

## This is a sub-heading
### Sub-sub-heading
  
Code, \`<div></div>\`, between 2 backticks.

\`\`\`
// Multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
**bold**
_italic_
**_both!_**
~~crossing out~~

[links](https://www.freecodecamp.com)
> Block Quotes!

Tables:

Header | Header | Header
------------ | ------------- | ------------- 
content | content | content
content | content | content

- Lists
  - Bulleted.
     - Different indentation levels.
        - Like this.

1. Numbered lists
1. With just 1s
1. List goes on...
- Even if you use dashes or asterisks.
* Embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

ReactDOM.render(<App />, document.getElementById('app'));
