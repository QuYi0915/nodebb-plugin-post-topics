<h1>Post-Topics</h1>
<hr/>

<form>
  <p>
    [[post-topics:admin-info]]
    <b style="color:green;">[[post-topics:admin-info-beta]]</b>
  </p><br/>
  <div>
    <p>
      <label for="Width">[[post-topics:admin-width-label]]</label>
      <textarea
          type="text"
          data-field="v-code:width"
          title="Width"
          class="form-control"
          id="post_topics_template"
          placeholder="[[post-topics:admin-width-placeholder]]">
      </textarea>
      <br/>
      <label for="Height">[[post-topics:admin-height-label]]</label>
      <textarea
          type="text"
          data-field="v-code:height"
          title="Height"
          class="form-control"
          id="post_topics_config"
          placeholder="[[post-topics:admin-height-placeholder]]">
      </textarea>
    </p>
  </div>
</form>

<button class="btn btn-lg btn-primary" id="PostTopics">[[post-topics:admin-save]]</button>

<script>
  $("#PostTopics").on("click", function () {
    $.post("/api/admin/plugins/post-topics",
      {
        template: $('#post_topics_template').val(),
        config: $('#post_topics_config').val()
      },
      function (res) {
        if(res.code){
          app.alertError(res.msg);
        }
      });
  });
</script>
