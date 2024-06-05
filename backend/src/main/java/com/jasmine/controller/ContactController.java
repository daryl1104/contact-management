package com.jasmine.controller;

import com.jasmine.exception.CodeException;
import com.jasmine.model.Contact;
import com.jasmine.model.OperationResult;
import com.jasmine.service.IContactService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 9:43 AM
 */
@RestController
@RequestMapping(value = "/contact")
public class ContactController {
    @Resource
    private IContactService contactService;

    @GetMapping("/search")
    public Object search(@RequestParam Integer userId, @RequestParam String search) {
        List<Contact> result = contactService.search(userId, search);
        return result;
    }

    @GetMapping("/lists")
    public Object lists(@RequestParam Integer userId,
                        @RequestParam(required = false, defaultValue = "0") Integer offset,
                        @RequestParam(required = false, defaultValue = "12") Integer limit) {

        return contactService.lists(userId, offset, limit);
    }

    @GetMapping("/get")
    public Object get(@RequestParam Integer userId,
                      @RequestParam("contact_id") Integer contactId) {
        return contactService.get(userId, contactId);
    }

    @PostMapping("/add")
    public Object add(@RequestParam Integer userId,
                      @RequestBody Contact contact) throws CodeException {
        contactService.add(userId, contact);
        return new OperationResult();
    }

    @GetMapping("/delete")
    public Object delete(@RequestParam Integer userId,
                         @RequestParam("contact_id") Integer contactId) {
        contactService.delete(userId, contactId);
        return new OperationResult();
    }

    @PostMapping("/update")
    public Object update(@RequestParam Integer userId,
                         @RequestBody Contact contact) {
        contactService.update(userId, contact);
        return new OperationResult();
    }

    @PostMapping("/importFile")
    public Object importFromCsv(@RequestParam(required = false) Integer userId,
                                @RequestParam("file")MultipartFile multipartFile) {
        StringBuilder sb = new StringBuilder();
        InputStream inputStream = null;
        BufferedReader bufferedReader = null;
        try {
            inputStream = multipartFile.getInputStream();
            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            while((line = bufferedReader.readLine()) != null) {
                sb.append(line);
                sb.append("\n");
            }

        }catch (Exception ex) {
            System.out.println("error.");
        } finally {
            try {
                inputStream.close();
                bufferedReader.close();
            } catch (Exception ex1) {
                ex1.printStackTrace();
            }
        }
        System.out.println(sb.toString());
        // split by "\n"
        String rawString = sb.toString();
        String[] lines = rawString.split("\\n");
        // 循环插入数据库
        for (int i = 1; i < lines.length; i++) {
            String line = lines[i];
            String[] fields = line.split(",");
            Contact contact = new Contact();
            contact.setName(fields[0]);
            contact.setGender(fields[1].equals("男")?0:1);
            contact.setAddress(fields[2]);
            contact.setPhoneNumber(fields[3]);
            try {
                contactService.add(userId, contact);
            } catch (Exception exception) {
                exception.printStackTrace();
            }

        }
        return new OperationResult();
    }

    @GetMapping("/exportFile")
    public void exportToCsv(@RequestParam Integer userId,
                            HttpServletRequest request,
                            HttpServletResponse response) throws CodeException {

        List<Contact> lists = contactService.lists(userId, null, null);

        String fileName = UUID.randomUUID().toString()+".csv";
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        // header
        String csvHeader = "姓名,性别,地址,手机号\n";
        String csvBody = lists.stream().map(e -> {
            return e.getName() + "," + (e.getGender() == 1 ? "女":"男") + "," + e.getAddress() + "," + e.getPhoneNumber();
        }).collect(Collectors.joining("\n"));

        try {
            ServletOutputStream outputStream = response.getOutputStream();
            outputStream.write(new byte[]{(byte) 0xEF, (byte) 0xBB, (byte) 0xBF});
            outputStream.write(csvHeader.getBytes(StandardCharsets.UTF_8));
            outputStream.write(csvBody.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping(value = "/logout")
    public Object logout(@RequestParam Integer userId,
                         HttpServletRequest request, HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("user", String.valueOf(userId)) // key & value
                .httpOnly(false)
                .secure(false)
                .domain("localhost")  // host
                .path("/")      // path
                .maxAge(0)
                .sameSite("Lax")  // sameSite

                .build()
                ;

        // Response to the client
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new OperationResult();
    }
}
