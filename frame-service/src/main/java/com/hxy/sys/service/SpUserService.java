package com.hxy.sys.service;

import com.hxy.base.page.Page;
import com.hxy.sys.entity.SpUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 用户信息表
 * 
 * @author hxy
 * @email huangxianyuan@gmail.com
 * @date 2018-02-07 16:18:54
 */
public interface SpUserService {
	
	SpUserEntity queryObject(Long id);
	
	Page<SpUserEntity> query(SpUserEntity spUserEntity, int pageNum);
	List<SpUserEntity> queryList(Map <String, Object> map);
    List<SpUserEntity> queryListByBean(SpUserEntity entity);
	
	int queryTotal(Map <String, Object> map);
	
	int save(SpUserEntity spUser);
	
	int update(SpUserEntity spUser);
	
	int delete(Long id);
	
	int deleteBatch(Long[] ids);
}
